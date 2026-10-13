export function totalQuantity(items) {
  if (!Array.isArray(items)) throw new TypeError('Expected an array');
  let total = 0;
  for (const entry of items) {
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry)
        || typeof entry.item !== 'string' || entry.item.trim().length === 0) {
      throw new TypeError('Expected a nonempty item name');
    }
    if (!Number.isSafeInteger(entry.quantity) || entry.quantity < 0) {
      throw new TypeError('Expected a nonnegative safe integer quantity');
    }
    total += entry.quantity;
    if (!Number.isSafeInteger(total)) throw new RangeError('Total exceeds safe integer range');
  }
  return total;
}
