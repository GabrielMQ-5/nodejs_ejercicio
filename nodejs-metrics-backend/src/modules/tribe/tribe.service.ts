import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TribeRepository } from './tribe.repository';
import { RepositoryEntity } from 'src/common/entities';
import {
  REPOSITORY_STATE,
  REPOSITORY_VERIFICATION_STATE,
  TRIBE_STATUS,
} from 'src/common/constants';
import { RepositoryDto, RepositoryVerificationStateDto } from 'src/common/dto';
import { Config } from 'src/config/config';
import { Parser as CsvParser } from 'json2csv';

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(TribeRepository)
    private readonly tribeRepository: TribeRepository,
  ) {}

  async findAllMetricsCsv(
    id: number,
  ): Promise<{ fileName: string; fileData: any }> {
    const metricsData = await this.findAllMetrics(id);
    const fields = [
      {
        label: 'ID Repositorio',
        value: 'id',
      },
      {
        label: 'Repositorio',
        value: 'name',
      },
      {
        label: 'Tribu',
        value: 'tribe',
      },
      {
        label: 'Organizacion',
        value: 'organization',
      },
      {
        label: 'Cobertura de PU',
        value: 'coverage',
      },
      {
        label: 'Code Smells',
        value: 'codeSmells',
      },
      {
        label: 'Bugs',
        value: 'bugs',
      },
      {
        label: 'Vulnerabilidades',
        value: 'vulnerabilities',
      },
      {
        label: 'Estado de Verificacion',
        value: 'verificationState',
      },
      {
        label: 'Estado del Repositorio',
        value: 'state',
      },
    ];
    const json2csvParser = new CsvParser({ fields });
    const fileData = json2csvParser.parse(metricsData);
    const fileName = `metrics_${metricsData[0].organization}_${metricsData[0].tribe}.csv`;
    return { fileName, fileData };
  }
  async findAllMetrics(id: number): Promise<RepositoryDto[]> {
    const tribe = await this.tribeRepository.findOne({
      where: { id_tribe: id, status: TRIBE_STATUS.ACTIVE },
    });
    if (!tribe) throw new NotFoundException('Tribu no encontrada');

    const tribeMetrics = await this.tribeRepository.findAllMetrics(id);
    if (!tribeMetrics || tribeMetrics.length == 0)
      throw new NotFoundException(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );

    const repositoryDtos: RepositoryDto[] = [];
    tribeMetrics.forEach((repository) => {
      repositoryDtos.push(this.formatRepositoryToDto(repository));
    });

    const repositoryVerificationStates =
      await this.fetchRepositoryVerificationState();

    repositoryVerificationStates.forEach((verified) => {
      try {
        repositoryDtos.find((x) => x.id == verified.id).verificationState =
          verified.state == REPOSITORY_VERIFICATION_STATE.VERIFIED
            ? 'Verificado'
            : verified.state == REPOSITORY_VERIFICATION_STATE.PENDING
            ? 'En espera'
            : 'Aprobado';
      } catch {}
    });

    return repositoryDtos;
  }

  formatRepositoryToDto(repository: RepositoryEntity) {
    const repositoryDto = new RepositoryDto();
    repositoryDto.id = repository.id_repository;
    repositoryDto.name = repository.name;
    repositoryDto.tribe = repository.tribe.name;
    repositoryDto.organization = repository.tribe.organization.name;
    repositoryDto.coverage = `${repository.metrics.coverage * 100}%`;
    repositoryDto.codeSmells = repository.metrics.code_smells;
    repositoryDto.bugs = repository.metrics.bugs;
    repositoryDto.vulnerabilities = repository.metrics.vulnerabilities;
    repositoryDto.hotspots = repository.metrics.hotspot;
    repositoryDto.verificationState = null;
    repositoryDto.state =
      repository.state == REPOSITORY_STATE.ENABLE
        ? 'Habilitado'
        : repository.state == REPOSITORY_STATE.ARCHIVED
        ? 'Archivado'
        : 'Deshabilitado';

    return repositoryDto;
  }

  async fetchRepositoryVerificationState(): Promise<
    RepositoryVerificationStateDto[]
  > {
    const url = Config.repositoryApiUrl;
    const res = await fetch(url);
    const data = await res.json();
    return data.repositories as RepositoryVerificationStateDto[];
  }
}
