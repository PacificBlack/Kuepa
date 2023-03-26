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
import { DTOTipoUsuarioSeed } from '../../dto';
import { TipoUsuario } from '../../entities';
import { TipoUsuarioSeedService } from './tipo-usuario-seed.service';

@Controller('seed/tipo-usuario-seed')
export class TipoUsuarioSeedController {
  constructor(
    private readonly tipo_usuario_seed_service: TipoUsuarioSeedService,
  ) {}

  @Get('/all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerTiposUsuarios(): Promise<TipoUsuario[] | Respuesta> {
    return await this.tipo_usuario_seed_service
      .obtenerTiposUsuarios()
      .catch((e) => {
        return { message: e.response, status: e.status };
      });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerTipoUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TipoUsuario | Respuesta> {
    return await this.tipo_usuario_seed_service
      .obtenerTipoUsuario(id)
      .catch((e) => {
        return { message: e.response, status: e.status };
      });
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async crearTipoUsuario(
    @Body(new ValidationPipe()) tipo_usuario: DTOTipoUsuarioSeed,
  ): Promise<Respuesta> {
    return await this.tipo_usuario_seed_service
      .crearTipoUsuario(tipo_usuario)
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
  async modificarTipoUsuario(
    @Body(new ValidationPipe()) tipo_usuario: DTOTipoUsuarioSeed,
  ): Promise<Respuesta> {
    return await this.tipo_usuario_seed_service
      .modificarTipoUsuario(tipo_usuario)
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
  async eliminarTipoUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Respuesta> {
    return await this.tipo_usuario_seed_service
      .eliminarTipoUsuario(id)
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
