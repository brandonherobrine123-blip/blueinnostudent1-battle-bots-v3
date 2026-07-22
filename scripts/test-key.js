const { loadApiKey } = require('./load-env');

const ENDPOINT = 'https://ark.ap-southeast.bytepluses.com/api/v3/images/generations';

async function main() {
  const { key, source } = loadApiKey();
  if (!key) {
    console.log('✗ No ART_API_KEY found (.env). That is fine — art will use placeholders.');
    return;
  }
  if (process.env.GEN_ART_DEBUG) console.log(`(key loaded from ${source})`);
  try {
    // Deliberately empty body: a good key fails validation (4xx, nothing billed),
    // a bad key fails auth (401/403). Either way, no image is generated.
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: '{}',
    });
    if (res.status === 401 || res.status === 403) {
      console.log(`✗ Key was rejected (HTTP ${res.status}). Check it, or just use placeholders.`);
    } else {
      console.log('✓ Key works. AI art is available.');
    }
  } catch (e) {
    console.log(`✗ Could not reach the API (${e.message}). Check your network, or use placeholders.`);
  }
}

if (require.main === module) main();
module.exports = { main };
