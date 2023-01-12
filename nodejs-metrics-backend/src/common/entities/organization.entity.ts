import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TribeEntity } from './tribe.entity';

@Entity()
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  public id_organization: number;

  @Column({ nullable: false, length: 50 })
  public name: string;

  @Column({ nullable: false })
  public status: number;

  @OneToMany(() => TribeEntity, (tribe) => tribe.organization)
  public tribes: TribeEntity[];
}
