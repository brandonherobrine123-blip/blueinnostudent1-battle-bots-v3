const fs = require('node:fs');
const path = require('node:path');
const { loadApiKey } = require('./load-env');

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
    console.log(`Fix: copy .env.example to .env and paste the class art key (your teacher posts it).`);
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
module.exports = { parseArgs, imagePath, imageExt, slug, isModerationError };
