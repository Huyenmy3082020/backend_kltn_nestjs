import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const getDatabaseConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  console.log('[DB] Using SSL:', isProduction ? 'Yes' : 'No');
  console.log('[DB] Database Host:', process.env.DB_HOST);

  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../modules/**/*.entity.{ts,js}')],
    synchronize: false,
    logging: isProduction ? false : ['error'],
    ssl: isProduction
      ? {
          rejectUnauthorized: true,
          ca: process.env.RDS_CA_PATH
            ? require('fs').readFileSync(process.env.RDS_CA_PATH).toString()
            : undefined,
        }
      : false,
    migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  });
};

export const AppDataSource = getDatabaseConfig();
