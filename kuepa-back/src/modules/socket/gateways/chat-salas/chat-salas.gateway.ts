import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { DTOMensajes } from 'src/modules/mensajes/dto';
import { MensajesService } from 'src/modules/mensajes/services/mensajes/mensajes.service';
import { SalasAndMensajesService } from 'src/modules/salas/services/salas-and-mensajes/salas-and-mensajes.service';

@WebSocketGateway({
  cors: { origin: '*', methods: ['GET', 'POST'] },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  credentials: true,
})
export class ChatSalasGateway implements OnGatewayConnection {
  constructor(
    private readonly mensajes_service: MensajesService,
    private readonly salas_and_mensaje_service: SalasAndMensajesService,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('Socket Gateway - Chat Sala');

  handleConnection(usuario: Socket, ...args: any[]) {
    console.log('Conectado', usuario.id);
  }

  @SubscribeMessage('mensaje')
  async handleMessage(client: Socket, mensaje: DTOMensajes) {
    await this.mensajes_service.crearMensaje(mensaje).then(async (res) => {
      const mensajes =
        await this.salas_and_mensaje_service.obtenerMensajesxSala(
          mensaje.id_sala,
        );
      this.server.emit('chat', mensajes);
    });
  }

  @SubscribeMessage('init')
  async handleInit(client: Socket, id_sala: number) {
    const mensajes = await this.salas_and_mensaje_service.obtenerMensajesxSala(
      id_sala,
    );
    this.server.emit('chat', mensajes);
  }
}
