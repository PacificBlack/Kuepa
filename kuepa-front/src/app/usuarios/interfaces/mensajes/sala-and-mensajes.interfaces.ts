import { MensajesInterface } from './mensajes.interfaces';

export interface SalasAndMensajesInterface {
  id?: number;
  salas?: any;
  mensajes: MensajesInterface;
  readonly creado?: Date;
  readonly actualizado?: Date;
}
