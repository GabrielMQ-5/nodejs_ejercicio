import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { RepositoryEntity } from './repository.entity';

@Entity()
export class MetricsEntity {
  @PrimaryColumn()
  public id_repository: number;

  @Column({ nullable: false, type: 'decimal' })
  public coverage: number;

  @Column({ nullable: false })
  public bugs: number;

  @Column({ nullable: false })
  public vulnerabilities: number;

  @Column({ nullable: false })
  public hotspot: number;

  @Column({ nullable: false })
  public code_smells: number;

  @OneToOne(() => RepositoryEntity, (repository) => repository.metrics, {
    nullable: false,
  })
  @JoinColumn()
  public repository: RepositoryEntity;
}
