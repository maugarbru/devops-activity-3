import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalDiagnostic } from 'src/entities/medical-diagnostic.entity';
import { Repository } from 'typeorm';

@Injectable({
  scope: Scope.DEFAULT,
})
export class MedicalDiagnosticService {
  constructor(
    @InjectRepository(MedicalDiagnostic)
    private medicalDiagnosticRepository: Repository<MedicalDiagnostic>,
  ) {}

  findAll() {
    return this.medicalDiagnosticRepository.find();
  }
  create(medicalDiagnostic: MedicalDiagnostic) {
    return this.medicalDiagnosticRepository.save(medicalDiagnostic);
  }
  delete(id: number) {
    return this.medicalDiagnosticRepository.delete(id);
  }
  async update(id: number, medicalDiagnostic: MedicalDiagnostic) {
    const entity = await this.medicalDiagnosticRepository.findOneBy({ id });
    if (entity) {
      return this.medicalDiagnosticRepository.update(id, medicalDiagnostic);
    }
  }
}
