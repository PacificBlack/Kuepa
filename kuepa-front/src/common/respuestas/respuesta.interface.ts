import { HttpStatusCode } from '@angular/common/http';

/**
 * Respuesta
 *
 * @remarks
 * Interface encargada de organizar la respuesta que obtiene el usuario al momento de realizar una consulta
 */
export interface Respuesta {
  status: HttpStatusCode;
  message: string;
}
