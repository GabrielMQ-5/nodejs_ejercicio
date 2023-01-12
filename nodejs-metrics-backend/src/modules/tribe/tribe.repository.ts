import { Injectable } from '@nestjs/common';
import { REPOSITORY_STATE } from 'src/common/constants';
import { Brackets, DataSource, Repository } from 'typeorm';
import { RepositoryEntity, TribeEntity } from '../../common/entities';

@Injectable()
export class TribeRepository extends Repository<TribeEntity> {
  constructor(private dataSource: DataSource) {
    super(TribeEntity, dataSource.createEntityManager());
  }

  async findAllMetrics(id: number) {
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    return this.manager
      .getRepository(RepositoryEntity)
      .createQueryBuilder('repository')
      .innerJoinAndSelect('repository.tribe', 'tribe')
      .innerJoinAndSelect('tribe.organization', 'organization')
      .innerJoinAndSelect('repository.metrics', 'metrics')
      .where('tribe.id_tribe = :id', {
        id: id,
      })
      .andWhere(
        new Brackets((sbq) => {
          sbq
            .where('repository.create_time >= :startOfYear', {
              startOfYear: startDate,
            })
            .andWhere('repository.state = :state', {
              state: REPOSITORY_STATE.ENABLE,
            })
            .andWhere('metrics.coverage >= :minCoverage', {
              minCoverage: 0.75,
            });
        }),
      )
      .getMany();
  }
}
