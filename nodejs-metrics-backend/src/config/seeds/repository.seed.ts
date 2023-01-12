import { Repository, DataSource } from 'typeorm';
import { RepositoryEntity, TribeEntity } from '../../common/entities';
import { REPOSITORY_STATE, REPOSITORY_STATUS } from '../../common/constants';

export async function seedMockRepository(dataSource: DataSource) {
  console.log('+ Seeding Test Repository');
  await dataSource.transaction(async (manager) => {
    const repository = manager.getRepository(RepositoryEntity);

    await seedRepository(
      repository,
      1,
      'Repositorio 1',
      REPOSITORY_STATE.ENABLE,
      REPOSITORY_STATUS.ACTIVE,
      1,
    );
    await seedRepository(
      repository,
      2,
      'Repositorio 2',
      REPOSITORY_STATE.ENABLE,
      REPOSITORY_STATUS.ACTIVE,
      1,
    );
    await seedRepository(
      repository,
      3,
      'Repositorio 3',
      REPOSITORY_STATE.ENABLE,
      REPOSITORY_STATUS.ACTIVE,
      1,
    );
    await seedRepository(
      repository,
      4,
      'Repositorio 4',
      REPOSITORY_STATE.ENABLE,
      REPOSITORY_STATUS.ACTIVE,
      1,
    );
    await seedRepository(
      repository,
      5,
      'Repositorio 5',
      REPOSITORY_STATE.ENABLE,
      REPOSITORY_STATUS.ACTIVE,
      2,
    );
    await seedRepository(
      repository,
      6,
      'Repositorio 6',
      REPOSITORY_STATE.ENABLE,
      REPOSITORY_STATUS.ACTIVE,
      2,
    );
    await seedRepository(
      repository,
      7,
      'Repositorio 7',
      REPOSITORY_STATE.ENABLE,
      REPOSITORY_STATUS.ACTIVE,
      2,
    );
    await seedRepository(
      repository,
      8,
      'Repositorio 8',
      REPOSITORY_STATE.ENABLE,
      REPOSITORY_STATUS.ACTIVE,
      2,
    );

    console.log('- Test Repository done');
  });
}

async function seedRepository(
  repository: Repository<RepositoryEntity>,
  id: number,
  name: string,
  state: string,
  status: string,
  tribeId: number,
) {
  const item = await repository.findOne({ where: { id_repository: id } });
  if (item) return;

  const newItem = new RepositoryEntity();
  newItem.id_repository = id;
  newItem.name = name;
  newItem.state = state;
  newItem.create_time = new Date();
  newItem.status = status;
  newItem.tribe = { id_tribe: tribeId } as TribeEntity;
  await repository.insert(newItem);
}
