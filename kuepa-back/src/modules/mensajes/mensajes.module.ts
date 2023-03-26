import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensajes } from './entities';
import { MensajesController } from './controllers/mensajes/mensajes.controller';
import { MensajesService } from './services/mensajes/mensajes.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { SalasModule } from '../salas/salas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensajes]),
    UsuariosModule,
    forwardRef(() => SalasModule),
  ],
  controllers: [MensajesController],
  providers: [MensajesService],
  exports: [MensajesService],
})
export class MensajesModule {}
