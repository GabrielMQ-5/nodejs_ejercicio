import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { TribeService } from './tribe.service';

@Controller('tribes')
export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  @Get(':id/metrics')
  findAllMetrics(@Param('id') id: number) {
    return this.tribeService.findAllMetrics(id);
  }

  @Get(':id/metrics/csv')
  async findAllMetricsCsv(@Param('id') id: number, @Res() res: Response) {
    const file = await this.tribeService.findAllMetricsCsv(id);
    res.attachment(file.fileName);
    res.status(200).send(file.fileData);
  }
}
