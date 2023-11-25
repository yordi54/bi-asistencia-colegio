import { Test, TestingModule } from '@nestjs/testing';
import { HorarioLaboralController } from './horario_laboral.controller';
import { HorarioLaboralService } from './horario_laboral.service';

describe('HorarioLaboralController', () => {
  let controller: HorarioLaboralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorarioLaboralController],
      providers: [HorarioLaboralService],
    }).compile();

    controller = module.get<HorarioLaboralController>(HorarioLaboralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
