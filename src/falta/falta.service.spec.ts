import { Test, TestingModule } from '@nestjs/testing';
import { FaltaService } from './falta.service';

describe('FaltaService', () => {
  let service: FaltaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaltaService],
    }).compile();

    service = module.get<FaltaService>(FaltaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
