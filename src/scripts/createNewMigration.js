// scripts/createMigration.js
const { execSync } = require('child_process');

const name = process.argv[2];

if (!name) {
  console.error('❌ Missing migration name!');
  process.exit(1);
}

const cmd = `npx typeorm-ts-node-commonjs migration:create ./src/migrations/${name}`;

console.log(`🚀 Running: ${cmd}`);
execSync(cmd, { stdio: 'inherit' });
