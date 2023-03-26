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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CrudEnum } from 'src/common/enum/crud.enum';
import { Public } from 'src/common/enum/globales.enum';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { LocalAuthGuard } from 'src/modules/auth/guards/local-auth/local-auth.guard';
import { DTOUsuario } from '../../dto';
import { Usuario } from '../../entities';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuario_service: UsuarioService) {}

  @Get('/all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerUsuarios(): Promise<Usuario[] | Respuesta> {
    return await this.usuario_service.obtenerUsuarios().catch((e) => {
      return { message: e.response, status: e.status };
    });
  }

  @Get('/xtipo/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerUsuariosxTipoUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Usuario[] | Respuesta> {
    return await this.usuario_service
      .obtenerUsuariosxTipoUsuario(id)
      .catch((e) => {
        return { message: e.response, status: e.status };
      });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerUsuario(@Param('id', ParseIntPipe) id: number) {
    return await this.usuario_service.obtenerUsuario(id).catch((e) => {
      return { message: e.response, status: e.status };
    });
  }

  @Public()
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async crearUsuario(
    @Body(new ValidationPipe()) usuario: DTOUsuario,
  ): Promise<Respuesta> {
    return await this.usuario_service
      .crearUsuario(usuario)
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
  async modificarUsuario(
    @Body(new ValidationPipe()) usuario: DTOUsuario,
  ): Promise<Respuesta> {
    return await this.usuario_service
      .modificarUsuario(usuario)
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
  async eliminarUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Respuesta> {
    return await this.usuario_service
      .eliminarUsuario(id)
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
