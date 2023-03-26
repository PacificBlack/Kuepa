import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { baseUrl_usuarios, headers_auth } from 'src/common/constants/http.constants';
import { Respuesta } from 'src/common/respuestas/respuesta.interface';
import { UsuarioInterface } from '../interfaces/usuarios.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _usuario!: UsuarioInterface;
  public id_usuario: number = 0;
  
  constructor(private http: HttpClient) {
    this.obtenerIdUsuarioSession();
    this.alamacenarDatosUsuario(this.id_usuario);
  }

  private obtenerIdUsuarioSession() {
    const token = String(localStorage.getItem('token') || ' ');
    if (token !== ' ') {
      const decoded: { uid: string } = jwtDecode(token);
      this.id_usuario = Number(decoded.uid);
    }
  }

  private alamacenarDatosUsuario(id_usuario: number) {
    const url = `${baseUrl_usuarios}/${id_usuario}`;
    let usuario_temp: UsuarioInterface = {
      username: '',
    };
    this.http
      .get<UsuarioInterface>(url, {
        headers: headers_auth,
      })
      .subscribe({
        next: (usuario) => {
          usuario_temp = usuario;
        },
        complete: () => {
          this.setusuario(usuario_temp);
        },
      });
  }

  get usuario() {
    return { ...this._usuario };
  }
  private setusuario(usuario: UsuarioInterface) {
    this._usuario = usuario;
  }

  obtenerUsuarios(): Observable<UsuarioInterface[]> {
    const url = `${baseUrl_usuarios}/all`;
    return this.http.get<UsuarioInterface[]>(url, {
      headers: headers_auth,
    });
  }

  obtenerUsuario(id: number): Observable<UsuarioInterface> {
    const url = `${baseUrl_usuarios}/${id}`;
    return this.http.get<UsuarioInterface>(url, {
      headers: headers_auth,
    });
  }

  crearUsuario(usuario: UsuarioInterface | {}): Observable<Respuesta> {
    const url = baseUrl_usuarios;
    return this.http.post<Respuesta>(url, usuario, { headers: headers_auth });
  }

  modificarUsuario(usuario: UsuarioInterface): Observable<Respuesta> {
    const url = baseUrl_usuarios;
    return this.http.patch<Respuesta>(url, usuario, { headers: headers_auth });
  }

  eliminarUsuario(id: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(`${baseUrl_usuarios}/${id}`, {
      headers: headers_auth,
    });
  }
}
