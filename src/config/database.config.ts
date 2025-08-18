import 'dotenv/config';
import { DataSource } from 'typeorm';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../modules/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  synchronize: false,
  logging: isProduction ? false : ['error'],
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Supabase cần SSL khi production
});
