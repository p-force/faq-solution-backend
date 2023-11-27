import { DataSource } from 'typeorm';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';
config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, LOG_INCLUDE_TYPEORM } = process.env;

if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_NAME) {
  throw new Error('Missing required env variables for database');
}
export const AppDataSource: DataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  logging: LOG_INCLUDE_TYPEORM === 'true',
  synchronize: false,
});
