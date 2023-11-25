import { Test, TestingModule } from '@nestjs/testing';
import { FaltaController } from './falta.controller';
import { FaltaService } from './falta.service';

describe('FaltaController', () => {
  let controller: FaltaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaltaController],
      providers: [FaltaService],
    }).compile();

    controller = module.get<FaltaController>(FaltaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
