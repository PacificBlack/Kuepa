import { Test, TestingModule } from '@nestjs/testing';
import { TipoUsuarioSeedService } from './tipo-usuario-seed.service';

describe('TipoUsuarioSeedService', () => {
  let service: TipoUsuarioSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoUsuarioSeedService],
    }).compile();

    service = module.get<TipoUsuarioSeedService>(TipoUsuarioSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
