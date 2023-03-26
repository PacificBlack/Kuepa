import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudEnum } from 'src/common/enum/crud.enum';
import { REGEX } from 'src/common/enum/globales.enum';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { UsuarioService } from 'src/modules/usuarios/services/usuario/usuario.service';
import { Repository, UpdateResult } from 'typeorm';
import { DTOMensajes } from '../../dto';
import { Mensajes } from '../../entities/mensajes/mensajes.entity';
import { SalasAndMensajesService } from '../../../salas/services/salas-and-mensajes/salas-and-mensajes.service';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensajes)
    private readonly mensajes_repository: Repository<Mensajes>,
    private readonly usuarios_service: UsuarioService,
    private readonly sala_and_mensaje_service: SalasAndMensajesService,
  ) {}

  async obtenerMensajes(): Promise<Mensajes[] | Respuesta> {
    return await this.mensajes_repository
      .find({
        relations: { usuario: { tipo_usuario: true } },
        order: { id: 'ASC' },
      })
      .then((result) => {
        if (result.length > 0) {
          return result;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTEN + 'Mensajes',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async obtenerMensajesxUsuario(
    id_usuario: number,
  ): Promise<Mensajes[] | Respuesta> {
    return await this.mensajes_repository
      .find({
        where: { usuario: { id: id_usuario } },
        relations: { usuario: { tipo_usuario: true } },
        order: { id: 'ASC' },
      })
      .then((result) => {
        if (result.length > 0) {
          return result;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTEN + 'Mensajes de ese Usuario',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async obtenerMensajesxUsuarioxRelation(id_usuario: number) {
    return await this.mensajes_repository.find({
      where: { usuario: { id: id_usuario } },
      relations: { usuario: { tipo_usuario: true } },
      order: { id: 'ASC' },
    });
  }

  async obtenerMensaje(id: number): Promise<Mensajes | Respuesta> {
    return await this.mensajes_repository
      .findOne({
        where: { id: id },
        relations: { usuario: { tipo_usuario: true } },
        order: { id: 'ASC' },
      })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTE + ' el Mensaje',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async crearMensaje(mensaje: DTOMensajes): Promise<void> {
    const usuario = await this.usuarios_service.obtenerUsuario(mensaje.usuario);

    return Promise.all([usuario])
      .then(async () => {
        mensaje.usuario = usuario;
        return await this.mensajes_repository
          .save(mensaje)
          .then(async (value) => {
            await this.sala_and_mensaje_service.asociarMensajeAndSala({
              mensajes: value.id,
              salas: mensaje.id_sala,
            });
          });
      })
      .catch((e) => {
        if (e.toString().includes('duplicate')) {
          throw new Error(
            `El campo ${
              REGEX.exec(e.detail)[0]
            } ya se esta usando, por favor intente con otro`,
          );
        } else {
          throw new Error(e);
        }
      });
  }
}
