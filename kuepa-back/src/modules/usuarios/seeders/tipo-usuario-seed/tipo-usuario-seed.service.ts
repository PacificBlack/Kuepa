import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuario } from '../../entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TipoUsuarioSeeder } from './tipo-usuario-seed.seed';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { CrudEnum } from 'src/common/enum/crud.enum';
import { DTOTipoUsuarioSeed } from '../../dto';
import { REGEX } from 'src/common/enum/globales.enum';

@Injectable()
export class TipoUsuarioSeedService {
  constructor(
    @InjectRepository(TipoUsuario)
    private readonly tipo_usuario_repository: Repository<TipoUsuario>,
  ) {}

  async SeedTipoUsuario() {
    return await this.tipo_usuario_repository
      .upsert(TipoUsuarioSeeder, ['id'])
      .catch((e) => {
        throw `${e} en el SeedTipoUsuario`;
      });
  }

  async obtenerTiposUsuarios(): Promise<TipoUsuario[] | Respuesta> {
    return await this.tipo_usuario_repository
      .find({ order: { id: 'ASC' } })
      .then((value) => {
        if (value.length > 0) {
          return value;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTEN + 'Tipos de Usuarios',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async obtenerTipoUsuario(id: number): Promise<TipoUsuario | Respuesta> {
    return await this.tipo_usuario_repository
      .findOne({ where: { id: id } })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTE + ' el Tipo de Usuario',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async crearTipoUsuario(
    tipo_usuario: DTOTipoUsuarioSeed,
  ): Promise<TipoUsuario> {
    return await this.tipo_usuario_repository
      .findOne({ where: { id: tipo_usuario.id } })
      .then(async (value) => {
        if (!value) {
          return await this.tipo_usuario_repository
            .save(tipo_usuario)
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
        } else {
          throw new HttpException(CrudEnum.NO_CREAR, HttpStatus.ACCEPTED);
        }
      });
  }

  async modificarTipoUsuario(
    tipo_usuario: DTOTipoUsuarioSeed,
  ): Promise<UpdateResult> {
    return await this.tipo_usuario_repository
      .findOne({ where: { id: tipo_usuario.id } })
      .then(async (value) => {
        if (value) {
          const nuevo_tipo_usuario = Object.assign(value, tipo_usuario);
          return await this.tipo_usuario_repository
            .update({ id: nuevo_tipo_usuario.id }, nuevo_tipo_usuario)
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
        } else {
          throw new HttpException(
            CrudEnum.CONFLICTO_ACTUALIZAR,
            HttpStatus.NOT_MODIFIED,
          );
        }
      });
  }

  async eliminarTipoUsuario(id: number): Promise<DeleteResult> {
    return await this.tipo_usuario_repository
      .find({
        where: { id: id },
      })
      .then(async (value) => {
        if (value) {
          return await this.tipo_usuario_repository
            .delete({ id: id })
            .catch((e) => {
              throw new Error(CrudEnum.NO_SE_PUEDE_ELIMINAR);
            });
        } else {
          throw new HttpException(CrudEnum.NO_EXISTE, HttpStatus.NO_CONTENT);
        }
      });
  }
}
