import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SalasAndMensajesService } from '../../services/salas-and-mensajes/salas-and-mensajes.service';
import { SalasAndMensajes } from '../../entities/salas/salas-and-mensajes/salas-and-mensajes.entity';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';

@Controller('salas-and-mensajes/xsala')
export class SalasAndMensajesController {
  constructor(private sala_and_mensaje_service: SalasAndMensajesService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerMensajesxSala(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SalasAndMensajes[] | Respuesta> {
    return await this.sala_and_mensaje_service
      .obtenerMensajesxSala(id)
      .catch((e) => {
        return { message: e.response, status: e.status };
      });
  }
}
