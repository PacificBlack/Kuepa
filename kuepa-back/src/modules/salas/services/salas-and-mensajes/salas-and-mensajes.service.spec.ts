import { Test, TestingModule } from '@nestjs/testing';
import { SalasAndMensajesService } from './salas-and-mensajes.service';

describe('SalasAndMensajesService', () => {
  let service: SalasAndMensajesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalasAndMensajesService],
    }).compile();

    service = module.get<SalasAndMensajesService>(SalasAndMensajesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
