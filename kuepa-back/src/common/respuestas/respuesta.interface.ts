import { HttpStatus } from '@nestjs/common';

/**
 * Respuesta
 *
 * @remarks
 * Interface encargada de organizar la respuesta que obtiene el usuario al momento de realizar una consulta
 */
export interface Respuesta {
  status: HttpStatus;
  message: string;
}
