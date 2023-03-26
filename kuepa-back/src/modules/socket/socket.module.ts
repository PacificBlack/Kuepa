import { Module } from '@nestjs/common';
import { ChatSalasGateway } from './gateways/chat-salas/chat-salas.gateway';
import { MensajesModule } from '../mensajes/mensajes.module';
import { SalasModule } from '../salas/salas.module';

@Module({
  imports: [MensajesModule, SalasModule],
  providers: [ChatSalasGateway],
})
export class SocketModule {}
