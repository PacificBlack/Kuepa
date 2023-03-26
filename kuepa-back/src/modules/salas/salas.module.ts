import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salas } from './entities';
import { SalasService } from './services/salas/salas.service';
import { SalasController } from './controllers/salas/salas.controller';
import { SalasAndMensajesController } from './controllers/salas-and-mensajes/salas-and-mensajes.controller';
import { SalasAndMensajesService } from './services/salas-and-mensajes/salas-and-mensajes.service';
import { MensajesModule } from '../mensajes/mensajes.module';
import { SalasAndMensajes } from './entities/salas/salas-and-mensajes/salas-and-mensajes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Salas, SalasAndMensajes]),

    forwardRef(() => MensajesModule),
  ],
  providers: [SalasService, SalasAndMensajesService],
  controllers: [SalasController, SalasAndMensajesController],
  exports: [SalasService, SalasAndMensajesService],
})
export class SalasModule {}
