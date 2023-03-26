import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, map, catchError, of } from 'rxjs';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { baseUrl_auth } from 'src/common/constants/http.constants';
import { AuthorizationResponse, ValidarTokenInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private http: HttpClient,
    private usuario_service: UsuarioService
  ) {}

  login(username: string, password: string) {
    const url = `${baseUrl_auth}/login`;
    const body = { username, password };
    return this.http.post<AuthorizationResponse>(url, body).pipe(
      tap((res:any) => {
        if (res.token) {
          localStorage.setItem('token', res.token.bearer);
          this.usuario_service.obtenerUsuario(this.usuario_service.usuario.id!);
        }
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  validarToken(): Observable<boolean> {
    const url = `${baseUrl_auth}/validar`;
    const headers = new HttpHeaders().set(
      'x-api-key',
      localStorage.getItem('token') || ''
    );

    return this.http.get<ValidarTokenInterface>(url, { headers }).pipe(
      map((res) => {
        this.usuario_service.obtenerUsuario(this.usuario_service.usuario.id!); //TODO: Verificar estado de contrato para clientes externos
        return res.status;
      }),
      catchError((err) => of(false))
    );
  }
}
