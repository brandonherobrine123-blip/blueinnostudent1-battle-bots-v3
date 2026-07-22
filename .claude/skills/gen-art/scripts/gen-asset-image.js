const fs = require('node:fs');
const path = require('node:path');

const MODEL = 'seedream-4-0-250828'; // swappable; any ModelArk image model works
const ENDPOINT = 'https://ark.ap-southeast.bytepluses.com/api/v3/images/generations';

function slug(name) {
  return String(name || 'art').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const out = { prompt: null, type: 'card', id: null };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--type') out.type = args[++i];
    else if (a === '--id') out.id = args[++i];
    else if (!a.startsWith('--') && out.prompt === null) out.prompt = a;
  }
  return out;
}

function imagePath(type, id, name, ext = 'png') {
  return path.posix.join('assets', 'images', `${type}s`, `${id || '000'}-${slug(name)}.${ext}`);
}

// Seedream 4.0 has no output-format option and always sends JPEG bytes; a
// swapped-in model may send PNG. Name the saved file by what the bytes are.
function imageExt(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  return 'png';
}

// --- .env loading -----------------------------------------------------------
// The generator only needs process.env.ART_API_KEY, but students keep their
// key in a .env file and Node does NOT read .env automatically. So we read it
// here with zero dependencies: walk up the folder tree from both the working
// directory and this script's folder, and use the first .env that defines a
// known key. An already-exported shell variable always wins. This means the key
// is found whether .env sits in the skill folder, the project root, or anywhere
// in between — and whichever directory the script is launched from.

const KEY_NAMES = ['ART_API_KEY'];

function parseEnv(text) {
  const out = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const body = line.replace(/^export\s+/, '');
    const eq = body.indexOf('=');
    if (eq === -1) continue;
    const k = body.slice(0, eq).trim();
    let v = body.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    } else {
      const c = v.indexOf(' #'); // strip trailing inline comment on unquoted values
      if (c !== -1) v = v.slice(0, c).trim();
    }
    if (k && !(k in out)) out[k] = v;
  }
  return out;
}

function envFileCandidates(startDirs) {
  if (process.env.GEN_ART_ENV_FILE) return [process.env.GEN_ART_ENV_FILE]; // pin to one file (CI/tests)
  const files = [];
  const seen = new Set();
  for (const start of startDirs) {
    let dir = path.resolve(start);
    while (!seen.has(dir)) {
      seen.add(dir);
      files.push(path.join(dir, '.env'));
      const parent = path.dirname(dir);
      if (parent === dir) break; // reached filesystem root
      dir = parent;
    }
  }
  return files;
}

function loadApiKey() {
  for (const name of KEY_NAMES) {
    if (process.env[name]) return { key: process.env[name], source: 'shell environment' };
  }
  for (const file of envFileCandidates([process.cwd(), __dirname])) {
    let text;
    try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
    const env = parseEnv(text);
    for (const name of KEY_NAMES) {
      if (env[name]) return { key: env[name], source: file };
    }
  }
  return { key: null, source: null };
}

// The provider's content filter rejects prompts/images it deems unsafe; those
// errors deserve a kid-friendly message instead of a scary HTTP code.
function isModerationError(text) {
  return /sensitive|moderation|risk not pass/i.test(String(text || ''));
}

async function requestImage(prompt, key) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size: '1024x1024',
      response_format: 'b64_json',
      watermark: false,
    }),
  });
  const body = await res.text();
  if (!res.ok) {
    if (isModerationError(body)) throw new Error('MODERATION');
    if (res.status === 401 || res.status === 403) throw new Error('KEY_REJECTED');
    throw new Error(`HTTP ${res.status}`);
  }
  const json = JSON.parse(body);
  const b64 = ((json.data || [])[0] || {}).b64_json;
  if (!b64) throw new Error('no image in response');
  return Buffer.from(b64, 'base64');
}

async function main() {
  const { prompt, type, id } = parseArgs(process.argv);
  if (!prompt) {
    console.log('Usage: node scripts/gen-asset-image.js "<prompt>" [--type card|token|tile] [--id NNN]');
    return;
  }
  const name = prompt.split(' ').slice(0, 3).join(' ');
  const out = imagePath(type, id, name);
  const { key, source } = loadApiKey();
  if (!key) {
    console.log(`No ART_API_KEY found — skipping art. Your asset still renders with a placeholder.`);
    console.log(`Fix: add a line "ART_API_KEY=your-key-here" to a .env file in this skill folder`);
    console.log(`(or anywhere up to your project root), then re-run. Your teacher posts the class key.`);
    console.log(`(Would have saved: ${out})`);
    return;
  }
  if (process.env.GEN_ART_DEBUG) console.log(`(key loaded from ${source})`);
  try {
    const img = await requestImage(prompt, key);
    const saved = imagePath(type, id, name, imageExt(img));
    fs.mkdirSync(path.dirname(saved), { recursive: true });
    fs.writeFileSync(saved, img);
    console.log(`saved: ${saved}`);
  } catch (e) {
    if (e.message === 'MODERATION') {
      console.log(`The safety filter didn't like that prompt — try describing it differently. The placeholder stays; ${out} not written.`);
    } else if (e.message === 'KEY_REJECTED') {
      console.log(`The class key was rejected — re-paste it (no spaces or quotes). The placeholder stays; ${out} not written.`);
    } else {
      console.log(`Image generation failed (${e.message}). No worries — the placeholder stays. ${out} not written.`);
    }
  }
}

if (require.main === module) main();
module.exports = { parseArgs, imagePath, imageExt, slug, parseEnv, envFileCandidates, loadApiKey, isModerationError };
