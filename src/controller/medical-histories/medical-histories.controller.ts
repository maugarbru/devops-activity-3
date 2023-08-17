import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MedicalHistoriesService } from '../../services/medical-histories.service';

@Controller('/api/v1/medical-histories')
export class MedicalHistoriesController {
  constructor(private medicalHistoriesService: MedicalHistoriesService) {}
  @Get()
  getHello() {
    return this.medicalHistoriesService.findAll();
  }
  @Post()
  create(@Body() payload: any) {
    return this.medicalHistoriesService.create(payload);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.medicalHistoriesService.delete(id);
  }
}
