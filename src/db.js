import postgres from 'postgres';

const connectionString =
  'DATABASE_URL=postgresql://postgres:123456@db.axpdskwabpsjrfoavtli.supabase.co:5432/postgres';
const sql = postgres(connectionString);

export default sql;
