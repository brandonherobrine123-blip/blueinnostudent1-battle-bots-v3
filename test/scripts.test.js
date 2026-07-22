const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const os = require('node:os');
const gen = require('../scripts/gen-asset-image.js');
const exp = require('../scripts/export-shape.js');

const script = (f) => path.join(__dirname, '..', 'scripts', f);
// Simulate "no key": blank the env name AND pin .env discovery to a file that
// does not exist, so the loader can't find the real .env on disk.
const noKey = {
  ...process.env,
  ART_API_KEY: '',
  GEN_ART_ENV_FILE: path.join(os.tmpdir(), 'bot-brawl-no-such-env-file'),
};

test('parseArgs reads prompt, type and id', () => {
  const a = gen.parseArgs(['node', 'x', 'a red bot', '--type', 'token', '--id', '105']);
  assert.equal(a.prompt, 'a red bot');
  assert.equal(a.type, 'token');
  assert.equal(a.id, '105');
});

test('parseArgs defaults type to card', () => {
  assert.equal(gen.parseArgs(['node', 'x', 'art']).type, 'card');
});

test('imagePath builds a typed, slugged path', () => {
  assert.equal(gen.imagePath('token', '105', 'Titan Unit'), 'assets/images/tokens/105-titan-unit.png');
  assert.equal(gen.imagePath('token', '105', 'Titan Unit', 'jpg'), 'assets/images/tokens/105-titan-unit.jpg');
});

test('imageExt reads the file type from the bytes, not the request', () => {
  assert.equal(gen.imageExt(Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00])), 'jpg');
  assert.equal(gen.imageExt(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d])), 'png');
});

test('placeholderSVG includes the name and a showcase note', () => {
  const svg = exp.placeholderSVG('Titan Unit', 'token');
  assert.match(svg, /Titan Unit/);
  assert.match(svg, /showcase/i);
});

test('gen-asset-image exits 0 and degrades without a key', () => {
  const out = execFileSync('node', [script('gen-asset-image.js'), 'a bot'], { env: noKey, encoding: 'utf8' });
  assert.match(out, /placeholder/i);
  assert.match(out, /No ART_API_KEY/i);
});

test('test-key reports a missing key without throwing', () => {
  const out = execFileSync('node', [script('test-key.js')], { env: noKey, encoding: 'utf8' });
  assert.match(out, /No ART_API_KEY/i);
});

test('isModerationError spots sensitive-content rejections, not generic errors', () => {
  assert.equal(gen.isModerationError('{"error":{"code":"OutputImageSensitiveContentDetected"}}'), true);
  assert.equal(gen.isModerationError('Post Img Risk Not Pass'), true);
  assert.equal(gen.isModerationError('HTTP 500'), false);
  assert.equal(gen.isModerationError(undefined), false);
});
