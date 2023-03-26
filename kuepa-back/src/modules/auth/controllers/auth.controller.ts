import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/common/enum/globales.enum';
import { Usuario } from 'src/modules/usuarios/entities';
import { LocalAuthGuard } from '../guards/local-auth/local-auth.guard';
import { AuthService } from '../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Request() req) {
    const usuario: Usuario = req.user;
    const data = await this.authService.login(usuario);
    return {
      status: HttpStatus.ACCEPTED,
      token: { bearer: data.access_token, uid: data.uid },
    };
  }

  @Public()
  @Get('/validar')
  @HttpCode(HttpStatus.CREATED)
  async validartoken(@Headers() header) {
    const token = header['x-api-key'];
    return await this.authService
      .validatetoken(token)
      .then((value) => {
        return { status: true, uid: value.uid };
      })
      .catch((e) => {
        return { status: false };
      });
  }
}
