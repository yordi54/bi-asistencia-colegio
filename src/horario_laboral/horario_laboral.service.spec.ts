import { Test, TestingModule } from '@nestjs/testing';
import { HorarioLaboralService } from './horario_laboral.service';

describe('HorarioLaboralService', () => {
  let service: HorarioLaboralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorarioLaboralService],
    }).compile();

    service = module.get<HorarioLaboralService>(HorarioLaboralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
