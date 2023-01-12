import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationRepository } from './organization.repository';
import { FindAllQueryDto, OrganizationDto } from '../../common/dto';
import { ORGANIZATION_STATUS } from 'src/common/constants';
import { OrganizationEntity } from 'src/common/entities';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationRepository)
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async findAll(query: FindAllQueryDto): Promise<OrganizationEntity[]> {
    if (!query.filter) query.filter = '';

    const result = await this.organizationRepository.findOrganizations(
      query.filter,
    );

    return result;
  }

  async findById(id: number): Promise<OrganizationEntity> {
    const organization = await this.organizationRepository.findOne({
      where: { id_organization: id },
    });
    if (!organization)
      throw new NotFoundException('Organizacion no encontrada');
    return organization;
  }

  async create(organization: OrganizationDto): Promise<OrganizationEntity> {
    if (!organization.name) throw new BadRequestException('Campos faltantes');
    const result = await this.organizationRepository.createOrganization(
      organization,
    );
    return result;
  }

  async update(
    id: number,
    entity: OrganizationDto,
  ): Promise<OrganizationEntity> {
    const organization = await this.organizationRepository.findOne({
      where: { id_organization: id, status: ORGANIZATION_STATUS.ACTIVE },
    });
    if (!organization)
      throw new NotFoundException('Organizacion no encontrada');

    const result = await this.organizationRepository.updateOrganization(
      organization,
      entity,
    );
    return result;
  }

  async delete(id: number): Promise<void> {
    const organization = await this.organizationRepository.findOne({
      where: { id_organization: id, status: ORGANIZATION_STATUS.ACTIVE },
    });
    if (!organization)
      throw new NotFoundException('Organizacion no encontrada');

    await this.organizationRepository.deleteOrganization(organization);
  }
}
