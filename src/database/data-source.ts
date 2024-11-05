import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { DataSource } from 'typeorm';

dotenvExpand.expand(dotenv.config());

const url = `postgresql://${process.env.DATASOURCE_USERNAME}:${process.env.DATASOURCE_PASSWORD}@${process.env.DATASOURCE_HOST}:${process.env.DATASOURCE_PORT}/${process.env.DATASOURCE_DATABASE}`;

export default new DataSource({
  type: 'postgres',
  url,
  entities: ['dist/domain/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
