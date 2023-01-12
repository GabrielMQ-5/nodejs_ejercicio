import { Repository, DataSource } from 'typeorm';
import { OrganizationEntity } from '../../common/entities';

export async function seedMockOrganization(dataSource: DataSource) {
  console.log('+ Seeding Test Organization');
  await dataSource.transaction(async (manager) => {
    const repository = manager.getRepository(OrganizationEntity);

    await seedOrganization(repository, 1, 'Organizacion 1', 1);

    console.log('- Test Organization done');
  });
}

async function seedOrganization(
  repository: Repository<OrganizationEntity>,
  id: number,
  name: string,
  status: number,
) {
  const item = await repository.findOne({ where: { id_organization: id } });
  if (item) return;

  const newItem = new OrganizationEntity();
  newItem.id_organization = id;
  newItem.name = name;
  newItem.status = status;
  await repository.insert(newItem);
}
