import test from 'node:test';
import assert from 'node:assert/strict';
import { totalQuantity } from '../src/items.mjs';
const item = quantity => ({ item: 'pencil', quantity });
test('empty list', () => assert.equal(totalQuantity([]), 0));
test('one item', () => assert.equal(totalQuantity([item(2)]), 2));
test('multiple items', () => assert.equal(totalQuantity([item(2), { item: 'notebook', quantity: 3 }]), 5));
test('zero quantity', () => assert.equal(totalQuantity([item(0)]), 0));
test('maximum safe quantity', () => assert.equal(totalQuantity([item(Number.MAX_SAFE_INTEGER)]), Number.MAX_SAFE_INTEGER));
test('requires an array', () => {
  for (const value of [null, {}, 'items', 2]) assert.throws(() => totalQuantity(value), TypeError);
});
test('requires item names', () => {
  for (const value of [null, [], {}, { item: '', quantity: 1 }, { item: ' ', quantity: 1 }, { item: 2, quantity: 1 }]) {
    assert.throws(() => totalQuantity([value]), TypeError);
  }
});
test('requires safe nonnegative integer quantities', () => {
  for (const value of [-1, 0.5, NaN, Infinity, '2', undefined, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => totalQuantity([item(value)]), TypeError);
  }
});
test('rejects overflowing totals', () => assert.throws(() => totalQuantity([item(Number.MAX_SAFE_INTEGER), item(1)]), RangeError));
test('does not mutate input', () => {
  const input = Object.freeze([Object.freeze(item(2))]);
  assert.equal(totalQuantity(input), 2);
  assert.deepEqual(input, [item(2)]);
});
