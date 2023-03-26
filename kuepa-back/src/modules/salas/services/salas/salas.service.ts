import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudEnum } from 'src/common/enum/crud.enum';
import { REGEX } from 'src/common/enum/globales.enum';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { DTOSalas } from '../../dto';
import { Salas } from '../../entities/salas/salas.entity';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Salas)
    private readonly salas_repository: Repository<Salas>,
  ) {}

  async SeedSala() {
    return await this.salas_repository.upsert(
      [{ nombre: 'Sala 1' }],
      ['nombre'],
    );
  }

  async obtenerSalas(): Promise<Salas[] | Respuesta> {
    return await this.salas_repository
      .find({ order: { id: 'ASC' } })
      .then((result) => {
        if (result.length > 0) {
          return result;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTEN + 'Salas',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async obtenerSala(id: number): Promise<Salas | Respuesta> {
    return await this.salas_repository
      .findOne({ where: { id: id } })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTE + ' la Sala',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async crearSala(sala: DTOSalas): Promise<Salas> {
    return await this.salas_repository.save(sala).catch((e) => {
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

  async modificarSala(sala: DTOSalas): Promise<UpdateResult> {
    return await this.salas_repository
      .findOne({ where: { id: sala.id } })
      .then(async (value) => {
        if (value) {
          const nuevo_sala = Object.assign(value, sala);
          return await this.salas_repository
            .update({ id: nuevo_sala.id }, nuevo_sala)
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

  async eliminarSala(id: number): Promise<DeleteResult> {
    return await this.salas_repository
      .findOne({ where: { id: id } })
      .then(async (value) => {
        if (value) {
          return await this.salas_repository.delete({ id: id }).catch((e) => {
            throw new Error(CrudEnum.NO_SE_PUEDE_ELIMINAR);
          });
        } else {
          throw new HttpException(CrudEnum.NO_EXISTE, HttpStatus.NO_CONTENT);
        }
      });
  }
}
