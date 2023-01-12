import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { RepositoryEntity } from './repository.entity';

@Entity()
export class TribeEntity {
  @PrimaryGeneratedColumn()
  public id_tribe: number;

  @Column({ nullable: false, length: 50 })
  public name: string;

  @Column({ nullable: false })
  public status: number;

  @ManyToOne(() => OrganizationEntity, (organization) => organization.tribes)
  organization: OrganizationEntity;

  @OneToMany(() => RepositoryEntity, (repository) => repository.tribe)
  public repositories: RepositoryEntity[];
}
