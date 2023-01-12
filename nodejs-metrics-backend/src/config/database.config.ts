import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from './config';
import { join } from 'path';

export class DatabaseConfig {
  static get get(): TypeOrmModuleOptions {
    const dbUrl = new URL(Config.dbUrl);
    const routingId = dbUrl.searchParams.get('options');
    dbUrl.searchParams.delete('options');

    return {
      type: 'cockroachdb',
      url: dbUrl.toString(),
      ssl: true,
      entities: [join(__dirname + '/../common/entities/*.entity{.ts,.js}')],
      synchronize: true,
      extra: {
        options: routingId,
      },
    };
  }
}
