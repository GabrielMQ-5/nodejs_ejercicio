import { Repository, DataSource } from 'typeorm';
import { MetricsEntity, RepositoryEntity } from '../../common/entities';

export async function seedMockMetrics(dataSource: DataSource) {
  console.log('+ Seeding Test Metrics');
  await dataSource.transaction(async (manager) => {
    const repository = manager.getRepository(MetricsEntity);

    await seedMetrics(repository, 1, 75 / 100, 15, 5, 2, 10);
    await seedMetrics(repository, 2, 86 / 100, 10, 3, 1, 15);
    await seedMetrics(repository, 3, 97 / 100, 5, 1, 0, 20);
    await seedMetrics(repository, 4, 64 / 100, 6, 3, 1, 10);
    await seedMetrics(repository, 5, 84 / 100, 0, 4, 0, 0);
    await seedMetrics(repository, 6, 26 / 100, 6, 9, 3, 7);
    await seedMetrics(repository, 7, 52 / 100, 8, 7, 4, 16);
    await seedMetrics(repository, 8, 76 / 100, 2, 10, 0, 17);

    console.log('- Test Metrics done');
  });
}

async function seedMetrics(
  repository: Repository<MetricsEntity>,
  id: number,
  coverage: number,
  bugs: number,
  vulnerabilities: number,
  hotspot: number,
  code_smells: number,
) {
  const item = await repository.findOne({ where: { id_repository: id } });
  if (item) return;

  const newItem = new MetricsEntity();
  newItem.id_repository = id;
  newItem.coverage = coverage;
  newItem.bugs = bugs;
  newItem.vulnerabilities = vulnerabilities;
  newItem.hotspot = hotspot;
  newItem.code_smells = code_smells;
  newItem.repository = { id_repository: id } as RepositoryEntity;
  await repository.insert(newItem);
}
