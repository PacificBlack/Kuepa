import { Test, TestingModule } from '@nestjs/testing';
import { TipoUsuarioSeedController } from './tipo-usuario-seed.controller';

describe('TipoUsuarioSeedController', () => {
  let controller: TipoUsuarioSeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoUsuarioSeedController],
    }).compile();

    controller = module.get<TipoUsuarioSeedController>(TipoUsuarioSeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
