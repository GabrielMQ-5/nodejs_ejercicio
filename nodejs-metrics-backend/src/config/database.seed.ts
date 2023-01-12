import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfig } from './database.config';
import {
  seedMockOrganization,
  seedMockTribe,
  seedMockRepository,
  seedMockMetrics,
} from './seeds';

dotenv.config();

const AppDataSource = new DataSource(DatabaseConfig.get as DataSourceOptions);
AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('+ Database seeding started.');

    await seedMockOrganization(dataSource);
    await seedMockTribe(dataSource);
    await seedMockRepository(dataSource);
    await seedMockMetrics(dataSource);

    console.log('- Database seeding done.');
    process.exit(0);
  })
  .catch((error) => {
    console.log('Database seeding failed.', error);
    process.exit(0);
  });
