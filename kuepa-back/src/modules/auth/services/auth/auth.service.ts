import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/common/enum/globales.enum';
import { Usuario } from 'src/modules/usuarios/entities';
import { UsuarioService } from 'src/modules/usuarios/services/usuario/usuario.service';
import { DTOAuthLogin } from '../../dto/dto-auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuario_service: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: DTOAuthLogin) {
    const { password, ...rest } = await this.usuario_service.loginUsuario(
      login,
    );
    return rest;
  }

  async login(usuario: Usuario) {
    const payload = {
      username: usuario.username,
      uid: usuario.id,
    };
    return {
      usuario,
      uid: payload.uid,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validatetoken(token: string) {
    const { username, uid } = this.jwtService.verify(token, {
      secret: JWT_SECRET,
    });
    return { username, uid };
  }
}
