import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from 'src/entities/medical-history.entity';
import { Repository } from 'typeorm';

@Injectable({
  scope: Scope.DEFAULT,
})
export class MedicalHistoriesService {
  constructor(
    @InjectRepository(MedicalHistory)
    private medicalHistoryRepository: Repository<MedicalHistory>,
  ) {}

  findAll() {
    return this.medicalHistoryRepository.find();
  }
  create(medicalHistory: MedicalHistory) {
    return this.medicalHistoryRepository.save(medicalHistory);
  }
  delete(id: number) {
    return this.medicalHistoryRepository.delete(id);
  }
}
