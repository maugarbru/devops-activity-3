import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MedicalHistoriesController } from './medical-histories.controller';
import { MedicalHistoriesService } from 'src/services/medical-histories.service';
import { MedicalHistory } from 'src/entities/medical-history.entity';

describe('MedicalHistoriesController', () => {
  let controller: MedicalHistoriesController;
  let service: MedicalHistoriesService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [MedicalHistoriesController],
      providers: [
        MedicalHistoriesService,
        {
          provide: getRepositoryToken(MedicalHistory),
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(() => []),
            delete: jest.fn(() => []),
            update: jest.fn(() => []),
          },
        },
      ],
    }).compile();

    controller = await testingModule.resolve<MedicalHistoriesController>(
      MedicalHistoriesController,
    );
    service = await testingModule.resolve<MedicalHistoriesService>(
      MedicalHistoriesService,
    );
  });

  it('should return all medical histories', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => []);
    expect(await service.findAll()).toStrictEqual([]);
  });
});
