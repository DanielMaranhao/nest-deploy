import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';

export default registerAs('database', () => {
  const url = `postgresql://${process.env.DATASOURCE_USERNAME}:${process.env.DATASOURCE_PASSWORD}@${process.env.DATASOURCE_HOST}:${process.env.DATASOURCE_PORT}/${process.env.DATASOURCE_DATABASE}`;

  const caPath = join('certs', 'sa-east-1-bundle.pem');
  const ca = readFileSync(caPath, 'utf8');

  const config = {
    type: 'postgres',
    url,
    autoLoadEntities: true,
    ssl: {
      ca,
    },
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
