//API medical-diagnostic
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MedicalDiagnosticService } from 'src/services/medical-diagnostic.service';

@Controller('/api/v1/medical-diagnostic')
export class MedicalDiagnosticController {
  constructor(private medicalDiagnosticService: MedicalDiagnosticService) {}
  @Get()
  getHello() {
    return this.medicalDiagnosticService.findAll();
  }
  @Post()
  create(@Body() payload: any) {
    return this.medicalDiagnosticService.create(payload);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.medicalDiagnosticService.delete(id);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.medicalDiagnosticService.update(id, payload);
  }
}
