import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MetricsEntity } from './metrics.entity';
import { TribeEntity } from './tribe.entity';

@Entity()
export class RepositoryEntity {
  @PrimaryGeneratedColumn()
  public id_repository: number;

  @Column({ nullable: false, length: 50 })
  public name: string;

  @Column({ nullable: false, length: 1 })
  public state: string;

  @Column({ nullable: false })
  public create_time: Date;

  @Column({ nullable: false, length: 1 })
  public status: string;

  @ManyToOne(() => TribeEntity, (tribe) => tribe.repositories)
  public tribe: TribeEntity;

  @OneToOne(() => MetricsEntity, (metrics) => metrics.repository)
  public metrics: MetricsEntity;
}
