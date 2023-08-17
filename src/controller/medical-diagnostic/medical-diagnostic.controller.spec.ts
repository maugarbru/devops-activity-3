import { Test, TestingModule } from '@nestjs/testing';
import { MedicalDiagnosticController } from './medical-diagnostic.controller';
import { MedicalDiagnosticService } from 'src/services/medical-diagnostic.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicalDiagnostic } from 'src/entities/medical-diagnostic.entity';

describe('MedicalDiagnosticController', () => {
  let controller: MedicalDiagnosticController;
  let service: MedicalDiagnosticService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [MedicalDiagnosticController],
      providers: [
        MedicalDiagnosticService,
        {
          provide: getRepositoryToken(MedicalDiagnostic),
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(() => []),
            delete: jest.fn(() => []),
            update: jest.fn(() => []),
          },
        },
      ],
    }).compile();

    controller = await testingModule.resolve<MedicalDiagnosticController>(
      MedicalDiagnosticController,
    );
    service = await testingModule.resolve<MedicalDiagnosticService>(
      MedicalDiagnosticService,
    );
  });

  it('should return all medical diagnostics', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => []);
    expect(await service.findAll()).toStrictEqual([]);
  });
});
