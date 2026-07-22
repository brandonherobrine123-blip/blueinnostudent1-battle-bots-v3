// Zero-dependency .env loader shared by the kit's scripts.
//
// Node does NOT read .env automatically, but students keep their ART_API_KEY
// there. So we read it here: walk up the folder tree from both the working
// directory and this file's folder, and return the first .env that defines a
// known key. An already-exported shell variable always wins. This means the key
// is found whether .env sits in the kit root or anywhere up to it, and whichever
// directory the script is launched from — no `source .env` needed.
//
// Override: set GEN_ART_ENV_FILE to pin discovery to exactly one file (skips the
// walk). Useful in CI/monorepos, and lets tests reproduce the no-key path.
const fs = require('node:fs');
const path = require('node:path');

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
  if (process.env.GEN_ART_ENV_FILE) return [process.env.GEN_ART_ENV_FILE];
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

module.exports = { KEY_NAMES, parseEnv, envFileCandidates, loadApiKey };
