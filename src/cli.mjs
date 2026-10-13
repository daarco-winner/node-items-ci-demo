import { totalQuantity } from './items.mjs';
try {
  if (process.argv.length !== 3) throw new Error('Expected one JSON argument');
  const items = JSON.parse(process.argv[2]);
  console.log(JSON.stringify({ totalQuantity: totalQuantity(items) }));
} catch {
  console.error('Invalid items input');
  process.exitCode = 1;
}
