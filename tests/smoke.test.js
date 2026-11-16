import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runSmoke } from '../scripts/smoke-test.js';
import { checkStructure } from '../scripts/check-structure.js';
import { FEATURES } from '../scripts/lib/features.js';

test('o smoke test do projeto não encontra falhas', async () => {
  const failed = (await runSmoke()).filter((item) => !item.ok).map((item) => item.name);
  assert.deepEqual(failed, []);
});

test('a estrutura do repositório está íntegra', () => {
  assert.deepEqual(checkStructure(), []);
});

test('existem exatamente 30 funcionalidades, 10 por rodada', () => {
  assert.equal(FEATURES.length, 30);
  for (const round of [1, 2, 3]) {
    assert.equal(FEATURES.filter((feature) => feature.round === round).length, 10);
  }
  assert.equal(new Set(FEATURES.map((feature) => feature.id)).size, 30);
});
