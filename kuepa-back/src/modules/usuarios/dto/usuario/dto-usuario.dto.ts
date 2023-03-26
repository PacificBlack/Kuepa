export class DTOUsuario {
  id?: number;
  nombre: string;
  apellido: string;
  username: string;
  password: string;
  tipo_usuario: any;
  readonly creado?: Date;
  readonly actualizado?: Date;
}
