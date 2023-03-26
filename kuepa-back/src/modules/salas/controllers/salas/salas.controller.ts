import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CrudEnum } from 'src/common/enum/crud.enum';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { DTOSalas } from '../../dto';
import { Salas } from '../../entities';
import { SalasService } from '../../services/salas/salas.service';

@Controller('salas')
export class SalasController {
  constructor(private readonly salas_service: SalasService) {}

  @Get('/all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerSalas(): Promise<Salas[] | Respuesta> {
    return await this.salas_service.obtenerSalas().catch((e) => {
      return { message: e.response, status: e.status };
    });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerSala(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Salas | Respuesta> {
    return await this.salas_service.obtenerSala(id).catch((e) => {
      return { message: e.response, status: e.status };
    });
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async crearSala(
    @Body(new ValidationPipe()) sala: DTOSalas,
  ): Promise<Respuesta> {
    return await this.salas_service
      .crearSala(sala)
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

  @Patch('')
  @HttpCode(HttpStatus.ACCEPTED)
  async modificarSala(
    @Body(new ValidationPipe()) sala: DTOSalas,
  ): Promise<Respuesta> {
    return await this.salas_service
      .modificarSala(sala)
      .then((value) => {
        return {
          status: HttpStatus.ACCEPTED,
          message: CrudEnum.ACTUALIZADO,
        };
      })
      .catch((e) => {
        return {
          status: HttpStatus.CONFLICT,
          message: e.toString(),
        };
      });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async eliminarSala(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Respuesta> {
    return await this.salas_service
      .eliminarSala(id)
      .then((value) => {
        return {
          status: HttpStatus.OK,
          message: CrudEnum.ELIMINADO,
        };
      })
      .catch((e) => {
        return {
          status: HttpStatus.NO_CONTENT,
          message: e.toString(),
        };
      });
  }
}
