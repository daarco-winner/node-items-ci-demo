import test from 'node:test';
import assert from 'node:assert/strict';
import { summarizeItems, totalQuantity } from '../src/items.mjs';
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

test('summarizes an empty list', () => {
  assert.deepEqual(summarizeItems([]), { totalQuantity: 0, itemCount: 0 });
});

test('summarizes one item', () => {
  assert.deepEqual(summarizeItems([item(2)]), { totalQuantity: 2, itemCount: 1 });
});

test('summarizes multiple items', () => {
  assert.deepEqual(
    summarizeItems([item(2), { item: 'notebook', quantity: 3 }]),
    { totalQuantity: 5, itemCount: 2 }
  );
});

test('summarizes zero and maximum safe quantities', () => {
  assert.deepEqual(summarizeItems([item(0)]), { totalQuantity: 0, itemCount: 1 });
  assert.deepEqual(
    summarizeItems([item(Number.MAX_SAFE_INTEGER)]),
    { totalQuantity: Number.MAX_SAFE_INTEGER, itemCount: 1 }
  );
});

test('summary requires an array', () => {
  for (const value of [null, {}, 'items', 2]) assert.throws(() => summarizeItems(value), TypeError);
});

test('summary requires valid entries and item names', () => {
  for (const value of [null, [], {}, { item: '', quantity: 1 }, { item: ' ', quantity: 1 }, { item: 2, quantity: 1 }]) {
    assert.throws(() => summarizeItems([value]), TypeError);
  }
});

test('summary requires safe nonnegative integer quantities', () => {
  for (const value of [-1, 0.5, NaN, Infinity, '2', undefined, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => summarizeItems([item(value)]), TypeError);
  }
});

test('summary rejects overflowing totals', () => {
  assert.throws(() => summarizeItems([item(Number.MAX_SAFE_INTEGER), item(1)]), RangeError);
});

test('summary does not mutate input and returns a new object', () => {
  const input = Object.freeze([Object.freeze(item(2))]);
  const first = summarizeItems(input);
  const second = summarizeItems(input);
  assert.deepEqual(first, { totalQuantity: 2, itemCount: 1 });
  assert.notStrictEqual(first, second);
  assert.deepEqual(input, [item(2)]);
});
