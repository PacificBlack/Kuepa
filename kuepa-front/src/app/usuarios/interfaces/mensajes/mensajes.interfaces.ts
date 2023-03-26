import { UsuarioInterface } from '../usuarios.interfaces';

export interface MensajesInterface {
  id?: number;
  contenido: string;
  usuario: UsuarioInterface;
  id_sala: number;
  readonly creado?: Date;
  readonly actualizado?: Date;
}
