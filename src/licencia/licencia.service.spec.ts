import { Test, TestingModule } from '@nestjs/testing';
import { LicenciaService } from './licencia.service';

describe('LicenciaService', () => {
  let service: LicenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicenciaService],
    }).compile();

    service = module.get<LicenciaService>(LicenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
