// scripts/generateMigration.js
const { execSync } = require('child_process');

const name = process.argv[2];

if (!name) {
  console.error('❌ Missing migration name!');
  process.exit(1);
}

const cmd = `npx typeorm-ts-node-commonjs -d ./src/config/database.config.ts migration:generate ./src/migrations/${name}`;
console.log(`🚀 Running: ${cmd}`);
execSync(cmd, { stdio: 'inherit' });
