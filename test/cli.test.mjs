import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const cli = fileURLToPath(new URL('../src/cli.mjs', import.meta.url));
function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    encoding: 'utf8', timeout: 5000, env: {}
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  return result;
}
test('CLI prints total', () => {
  const result = run(['[{"item":"eraser","quantity":4}]']);
  assert.equal(result.status, 0);
  assert.equal(result.stdout, '{"totalQuantity":4}\n');
  assert.equal(result.stderr, '');
});
test('CLI rejects malformed JSON', () => {
  const result = run(['{']);
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, 'Invalid items input\n');
});
test('CLI rejects invalid quantities and missing arguments', () => {
  for (const args of [[], ['[{"item":"pencil","quantity":-1}]']]) {
    const result = run(args);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.equal(result.stderr, 'Invalid items input\n');
  }
});
