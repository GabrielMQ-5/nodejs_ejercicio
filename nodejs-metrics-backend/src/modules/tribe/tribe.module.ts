import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import { TribeEntity } from '../../common/entities';
import { TribeRepository } from './tribe.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TribeEntity])],
  providers: [TribeService, TribeRepository],
  controllers: [TribeController],
})
export class TribeModule {}
