import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { MensajesModule } from './modules/mensajes/mensajes.module';
import { SalasModule } from './modules/salas/salas.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth/jwt-auth.guard';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsuariosModule,
    SalasModule,
    MensajesModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
