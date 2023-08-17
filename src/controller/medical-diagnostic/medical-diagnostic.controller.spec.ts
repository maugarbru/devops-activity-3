import { Test, TestingModule } from '@nestjs/testing';
import { MedicalDiagnosticController } from './medical-diagnostic.controller';
import { MedicalDiagnosticService } from 'src/services/medical-diagnostic.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicalDiagnostic } from 'src/entities/medical-diagnostic.entity';

const users = [];
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
            findAll: jest.fn(() => users),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return and empty array if there are not registers', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => users);
    expect(await service.findAll()).toStrictEqual([]);
  });

  it('should return the list with medical diagnostic', async () => {
    jest.spyOn(service, 'create').mockImplementation(async (body) => {
      users.push(body);
      return body;
    });
    jest.spyOn(service, 'findAll').mockImplementation(async () => users);
    service.create({} as any);
    expect((await service.findAll()).length).toBeGreaterThan(0);
  })
});