import { Injectable } from '@nestjs/common';
import { ORGANIZATION_STATUS } from 'src/common/constants';
import { OrganizationDto } from 'src/common/dto';
import { DataSource, Repository } from 'typeorm';
import { OrganizationEntity } from '../../common/entities';

@Injectable()
export class OrganizationRepository extends Repository<OrganizationEntity> {
  constructor(private dataSource: DataSource) {
    super(OrganizationEntity, dataSource.createEntityManager());
  }

  async findOrganizations(filter = '') {
    return this.createQueryBuilder('organization')
      .where('organization.status = :status', {
        status: ORGANIZATION_STATUS.ACTIVE,
      })
      .andWhere(`organization.name LIKE '%${filter}%'`)
      .getMany();
  }

  async createOrganization(organization: OrganizationDto) {
    const organizationEnt = new OrganizationEntity();
    organizationEnt.name = organization.name;
    organizationEnt.status = organization.status
      ? organization.status
      : ORGANIZATION_STATUS.ACTIVE;
    return this.save(organizationEnt);
  }

  async updateOrganization(
    organizationEnt: OrganizationEntity,
    organization: OrganizationDto,
  ) {
    organizationEnt.name = organization.name;
    return this.save(organizationEnt);
  }

  async deleteOrganization(organizationEnt: OrganizationEntity) {
    organizationEnt.status = ORGANIZATION_STATUS.INACTIVE;
    return this.save(organizationEnt);
  }
}
