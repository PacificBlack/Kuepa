import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';

export const headers_auth = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const baseUrl_auth: string = `${environment.baseUrl}/auth`;
export const baseUrl_usuarios: string = `${environment.baseUrl}/usuario`;