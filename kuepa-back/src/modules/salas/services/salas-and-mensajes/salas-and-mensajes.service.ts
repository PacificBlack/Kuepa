import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalasAndMensajes } from '../../entities/salas/salas-and-mensajes/salas-and-mensajes.entity';
import { Mensajes } from '../../../mensajes/entities/mensajes/mensajes.entity';
import { CrudEnum } from 'src/common/enum/crud.enum';
import { DTOSalasAndMensajes } from '../../dto/salas/salas-and-mensajes/dto-salas-and-mensajes.dto';
import { SalasService } from '../salas/salas.service';
import { MensajesService } from 'src/modules/mensajes/services/mensajes/mensajes.service';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { REGEX } from 'src/common/enum/globales.enum';

@Injectable()
export class SalasAndMensajesService {
  constructor(
    @InjectRepository(SalasAndMensajes)
    private readonly salas_and_mensajes_repository: Repository<SalasAndMensajes>,
    private readonly salas_service: SalasService,
    @Inject(forwardRef(() => MensajesService))
    private readonly mensajes_service: MensajesService,
  ) {}

  async obtenerMensajesxSala(
    id_sala: number,
  ): Promise<SalasAndMensajes[] | Respuesta> {
    return await this.salas_and_mensajes_repository
      .find({
        where: { salas: { id: id_sala } },
        relations: { mensajes: { usuario: { tipo_usuario: true } } },
        order: { id: 'ASC' },
      })
      .then((result) => {
        if (result.length > 0) {
          return result;
        } else {
          throw new HttpException(
            CrudEnum.NO_EXISTEN + 'Mensajes por esta Sala',
            HttpStatus.NO_CONTENT,
          );
        }
      });
  }

  async asociarMensajeAndSala(
    sala_and_mensaje: DTOSalasAndMensajes,
  ): Promise<SalasAndMensajes> {
    const sala = await this.salas_service.obtenerSala(sala_and_mensaje.salas);
    const mensaje = await this.mensajes_service.obtenerMensaje(
      sala_and_mensaje.mensajes,
    );

    return Promise.all([sala, mensaje]).then(async () => {
      sala_and_mensaje.salas = sala;
      sala_and_mensaje.mensajes = mensaje;

      return await this.salas_and_mensajes_repository
        .save(sala_and_mensaje)
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
  }
}
