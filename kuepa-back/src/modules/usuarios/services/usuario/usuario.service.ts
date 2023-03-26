import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudEnum } from 'src/common/enum/crud.enum';
import { REGEX } from 'src/common/enum/globales.enum';
import { HashPassword } from 'src/common/hashing/hashing';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { DTOUsuario } from '../../dto';
import { Usuario } from '../../entities';
import { TipoUsuarioSeedService } from '../../seeders/tipo-usuario-seed/tipo-usuario-seed.service';
import { DTOAuthLogin } from '../../../auth/dto/dto-auth-login.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuario_repository: Repository<Usuario>,
    private readonly tipo_usuario_service: TipoUsuarioSeedService,
  ) {}

  async obtenerUsuarios(): Promise<Usuario[] | Respuesta> {
    return await this.usuario_repository
      .find({
        relations: { tipo_usuario: true },
        order: { id: 'ASC' },
      })
      .then((result) => {
        if (result.length > 0) {
          return result;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTEN + 'Usuarios',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async obtenerUsuariosxTipoUsuario(
    id_tipo: number,
  ): Promise<Usuario[] | Respuesta> {
    return await this.usuario_repository
      .find({
        relations: { tipo_usuario: true },
        where: { tipo_usuario: { id: id_tipo } },
        order: { id: 'ASC' },
      })
      .then((result) => {
        if (result.length > 0) {
          return result;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTEN + 'Usuarios con ese tipo',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async obtenerUsuario(id: number) {
    return await this.usuario_repository
      .findOne({
        relations: { tipo_usuario: true },
        where: { id: id },
      })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTE + ' el Usuario',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async crearUsuario(usuario: DTOUsuario): Promise<Usuario> {
    const tipo_usuario = await this.tipo_usuario_service.obtenerTipoUsuario(
      usuario.id,
    );
    const pass = await HashPassword.HashingPassword(usuario.password).then(
      (value) => {
        return value;
      },
    );

    return Promise.all([tipo_usuario])
      .then(async () => {
        usuario.tipo_usuario = tipo_usuario;
        usuario.password = pass;
        return await this.usuario_repository.save(usuario);
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

  async modificarUsuario(usuario: DTOUsuario): Promise<UpdateResult> {
    return await this.usuario_repository
      .findOne({
        relations: { tipo_usuario: true },
        where: { id: usuario.id },
      })
      .then(async (value) => {
        if (value) {
          let pass = '';
          if (usuario.password === value.password) {
            pass = value.password;
          } else {
            pass = await HashPassword.HashingPassword(usuario.password).then(
              (value) => {
                return value;
              },
            );
          }

          const nuevo_usuario = Object.assign(value, usuario);
          const tipo_usuario =
            await this.tipo_usuario_service.obtenerTipoUsuario(
              nuevo_usuario.id,
            );

          return Promise.all([tipo_usuario]).then(async () => {
            usuario.tipo_usuario = tipo_usuario;
            usuario.password = pass;

            return await this.usuario_repository
              .update({ id: nuevo_usuario.id }, nuevo_usuario)
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
          });
        } else {
          throw new HttpException(
            CrudEnum.CONFLICTO_ACTUALIZAR,
            HttpStatus.NOT_MODIFIED,
          );
        }
      });
  }

  async eliminarUsuario(id: number): Promise<DeleteResult> {
    return await this.usuario_repository
      .findOne({ where: { id: id } })
      .then(async (value) => {
        if (value) {
          return await this.usuario_repository.delete({ id: id }).catch((e) => {
            throw new Error(CrudEnum.NO_SE_PUEDE_ELIMINAR);
          });
        } else {
          throw new HttpException(CrudEnum.NO_EXISTE, HttpStatus.NO_CONTENT);
        }
      });
  }

  async loginUsuario(loging: DTOAuthLogin): Promise<any> {
    return await this.usuario_repository
      .findOne({
        relations: {
          tipo_usuario: true,
        },
        where: { username: loging.username },
      })
      .then(async (value) => {
        if (
          value &&
          (await HashPassword.ComparePassword(loging.password, value.password))
        ) {
          return value;
        } else {
          throw new HttpException(
            'Algo anda mal con tú Usuario o Contraseña',
            HttpStatus.CREATED,
          );
        }
      });
  }

}
