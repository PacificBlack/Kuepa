export enum CrudEnum {
  CREADO = 'Creado con exito',
  ACTUALIZADO = 'Actualizado con exito',
  ELIMINADO = 'Eliminado con exito',
  NO_ELIMINADO = 'No se pudo eliminar',
  NO_CREAR = 'No se puede crear debido a que ya existe un dato con ese id',
  NO_CREAR_DUPLICADO = 'No se puede crear debido a que uno de sus campos que ya se encuentra registrado en nuestra base de datos ',

  CONFLICTO_CREAR = 'No se pudo crear porque no existe ningun',
  CONFLICTO_ACTUALIZAR = 'No se puede actualizar debido a que no existe',
  CONFLICTO = 'No se pueden registrar los datos ingresados porque ya existen',
  CONFLICTO_ACTUALIZAR_ASOCIACION = 'No se puede modificar porque el campo que trata de ingresar ya tiene una relación, campo: ',
  CONFLICTO_CORREO = 'No se puede crear debido a que ese correo ya esta en uso',
  CONFLICTO_USUARIO = 'No se puede crear debido a que ese usuario ya esta en uso',
  CONFLICTO_RELACION = 'No se pueden relacionar los campos porque ya tiene relación con',

  NO_EXISTE = 'No existe',
  NO_EXISTEN = 'Por el momento no hay disponibilidad de ',

  NO_SE_PUEDE_ELIMINAR = 'No se pueden eliminar debido a que de este dependen otros',
}
