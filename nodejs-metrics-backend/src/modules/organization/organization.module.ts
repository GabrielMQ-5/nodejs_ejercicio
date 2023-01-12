import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationEntity } from '../../common/entities';
import { OrganizationRepository } from './organization.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [OrganizationService, OrganizationRepository],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
