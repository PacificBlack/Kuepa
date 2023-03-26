import { Test, TestingModule } from '@nestjs/testing';
import { SalasAndMensajesController } from './salas-and-mensajes.controller';

describe('SalasAndMensajesController', () => {
  let controller: SalasAndMensajesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalasAndMensajesController],
    }).compile();

    controller = module.get<SalasAndMensajesController>(SalasAndMensajesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
