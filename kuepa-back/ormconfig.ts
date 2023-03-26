
import { DataSourceOptions } from 'typeorm';
import dotenv = require('dotenv');

dotenv.config();

const PostgresDBData: DataSourceOptions = {
  type: 'postgres',
  //url: process.env.DATABASE_URL,
  //ssl: { rejectUnauthorized: false },
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logging: true,
  logger: 'file',
};

export = PostgresDBData;