import { Test, TestingModule } from '@nestjs/testing';
import { HorarioDiasController } from './horario_dias.controller';
import { HorarioDiasService } from './horario_dias.service';

describe('HorarioDiasController', () => {
  let controller: HorarioDiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorarioDiasController],
      providers: [HorarioDiasService],
    }).compile();

    controller = module.get<HorarioDiasController>(HorarioDiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
