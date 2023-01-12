import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { FindAllQueryDto, OrganizationDto } from 'src/common/dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  findAll(@Query() query: FindAllQueryDto) {
    return this.organizationService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.organizationService.findById(id);
  }

  @Post()
  create(@Body() organization: OrganizationDto) {
    return this.organizationService.create(organization);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() organization: OrganizationDto) {
    return this.organizationService.update(id, organization);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.organizationService.delete(id);
  }
}
