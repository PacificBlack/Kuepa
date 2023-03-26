import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from 'src/common/enum/globales.enum';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsuariosModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
