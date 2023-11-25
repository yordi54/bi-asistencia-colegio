import { Test, TestingModule } from '@nestjs/testing';
import { HorarioDiasService } from './horario_dias.service';

describe('HorarioDiasService', () => {
  let service: HorarioDiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorarioDiasService],
    }).compile();

    service = module.get<HorarioDiasService>(HorarioDiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
