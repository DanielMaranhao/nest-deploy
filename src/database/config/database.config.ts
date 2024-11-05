import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', () => {
  const url = `postgresql://${process.env.DATASOURCE_USERNAME}:${process.env.DATASOURCE_PASSWORD}@${process.env.DATASOURCE_HOST}:${process.env.DATASOURCE_PORT}/${process.env.DATASOURCE_DATABASE}`;

  const config = {
    type: 'postgres',
    url,
    autoLoadEntities: true,
  } as const satisfies TypeOrmModuleOptions;
  return config;
});
