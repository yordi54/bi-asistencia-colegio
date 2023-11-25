import { Test, TestingModule } from '@nestjs/testing';
import { LicenciaController } from './licencia.controller';
import { LicenciaService } from './licencia.service';

describe('LicenciaController', () => {
  let controller: LicenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenciaController],
      providers: [LicenciaService],
    }).compile();

    controller = module.get<LicenciaController>(LicenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
