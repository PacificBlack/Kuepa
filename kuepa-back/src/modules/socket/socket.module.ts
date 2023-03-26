import { Module } from '@nestjs/common';
import { ChatSalasGateway } from './gateways/chat-salas/chat-salas.gateway';
import { MensajesModule } from '../mensajes/mensajes.module';

@Module({
  imports: [MensajesModule],
  providers: [ChatSalasGateway],
})
export class SocketModule {}
