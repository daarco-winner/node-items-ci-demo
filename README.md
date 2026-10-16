# Node items example

A small Node.js example that totals item quantities. Requires Node.js 24.
No external packages are required.

```sh
npm test
node src/cli.mjs '[{"item":"pencil","quantity":2},{"item":"notebook","quantity":3}]'
```

The command prints `{"totalQuantity":5}`. Each item needs a nonempty name
and a nonnegative safe integer quantity. Invalid input exits with code 1.

The module also exports `summarizeItems(items)`, which returns a new object
containing the total quantity and number of items:

```js
summarizeItems([]);
// { totalQuantity: 0, itemCount: 0 }

summarizeItems([
  { item: 'pencil', quantity: 2 },
  { item: 'notebook', quantity: 3 }
]);
// { totalQuantity: 5, itemCount: 2 }
```

It applies the same validation and errors as `totalQuantity(items)` and does
not mutate the input.

Pull requests run the tests on their exact head commit using GitHub-hosted
runners. Passing tests do not authorize a merge. Human review is required.
