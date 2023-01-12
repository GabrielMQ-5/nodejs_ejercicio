import { Repository, DataSource } from 'typeorm';
import { OrganizationEntity, TribeEntity } from '../../common/entities';

export async function seedMockTribe(dataSource: DataSource) {
  console.log('+ Seeding Test Tribe');
  await dataSource.transaction(async (manager) => {
    const repository = manager.getRepository(TribeEntity);

    await seedTribe(repository, 1, 'Tribu 1', 1);
    await seedTribe(repository, 2, 'Tribu 2', 1);

    console.log('- Test Tribe done');
  });
}

async function seedTribe(
  repository: Repository<TribeEntity>,
  id: number,
  name: string,
  status: number,
) {
  const item = await repository.findOne({ where: { id_tribe: id } });
  if (item) return;

  const newItem = new TribeEntity();
  newItem.id_tribe = id;
  newItem.name = name;
  newItem.status = status;
  newItem.organization = { id_organization: 1 } as OrganizationEntity;
  await repository.insert(newItem);
}
