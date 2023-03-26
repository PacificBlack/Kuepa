import { TipoUsuarioInterface } from './tipo-usuario.interfaces';

export interface UsuarioInterface {
  id?: number;
  nombre?: string;
  apellido?: string;
  username: string;
  password?: string;
  tipo_usuario?: TipoUsuarioInterface;
  readonly creado?: Date;
  readonly actualizado?: Date;

  token?: string;
}
