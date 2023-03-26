import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CrudEnum } from 'src/common/enum/crud.enum';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { DTOMensajes } from '../../dto';
import { Mensajes } from '../../entities';
import { MensajesService } from '../../services/mensajes/mensajes.service';

@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensaje_service: MensajesService) {}

  @Get('/all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerMensajes(): Promise<Mensajes[] | Respuesta> {
    return await this.mensaje_service.obtenerMensajes().catch((e) => {
      return { message: e.response, status: e.status };
    });
  }

  @Get('/xusuario/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerMensajesxUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Mensajes[] | Respuesta> {
    return await this.mensaje_service.obtenerMensajesxUsuario(id).catch((e) => {
      return { message: e.response, status: e.status };
    });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerMensaje(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Mensajes | Respuesta> {
    return await this.mensaje_service.obtenerMensaje(id).catch((e) => {
      return { message: e.response, status: e.status };
    });
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async crearMensaje(
    @Body(new ValidationPipe()) mensaje: DTOMensajes,
  ): Promise<Respuesta> {
    return await this.mensaje_service
      .crearMensaje(mensaje)
      .then((value) => {
        return {
          status: HttpStatus.CREATED,
          message: CrudEnum.CREADO,
        };
      })
      .catch((e) => {
        return {
          status: HttpStatus.CONFLICT,
          message: e.toString(),
        };
      });
  }
}
