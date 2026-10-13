# Node items example

A small Node.js example that totals item quantities. Requires Node.js 24.
No external packages are required.

```sh
npm test
node src/cli.mjs '[{"item":"pencil","quantity":2},{"item":"notebook","quantity":3}]'
```

The command prints `{"totalQuantity":5}`. Each item needs a nonempty name
and a nonnegative safe integer quantity. Invalid input exits with code 1.

Pull requests run the tests on their exact head commit using GitHub-hosted
runners. Passing tests do not authorize a merge. Human review is required.
