const path = require('path');

const args = process.argv;
console.log(
  '%celelee test:',
  'background:#000;color:#fff',
  path.resolve(process.cwd(), 'packages'),
);
