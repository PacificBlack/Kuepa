import { Test, TestingModule } from '@nestjs/testing';
import { ChatSalasGateway } from './chat-salas.gateway';

describe('ChatSalasGateway', () => {
  let gateway: ChatSalasGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatSalasGateway],
    }).compile();

    gateway = module.get<ChatSalasGateway>(ChatSalasGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
