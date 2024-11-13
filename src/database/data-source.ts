import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';

dotenvExpand.expand(dotenv.config());

const url = `postgresql://${process.env.DATASOURCE_USERNAME}:${process.env.DATASOURCE_PASSWORD}@${process.env.DATASOURCE_HOST}:${process.env.DATASOURCE_PORT}/${process.env.DATASOURCE_DATABASE}`;

const caPath = 'sa-east-1-bundle.pem';
const ca = readFileSync(caPath, 'utf8');

export default new DataSource({
  type: 'postgres',
  url,
  ssl: {
    ca,
  },
  entities: ['dist/domain/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
});
