import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuario, Usuario } from './entities';
import { UsuarioService } from './services/usuario/usuario.service';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { TipoUsuarioSeedController } from './seeders/tipo-usuario-seed/tipo-usuario-seed.controller';
import { TipoUsuarioSeedService } from './seeders/tipo-usuario-seed/tipo-usuario-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, TipoUsuario])],
  providers: [UsuarioService, TipoUsuarioSeedService],
  controllers: [UsuarioController, TipoUsuarioSeedController],
  exports: [UsuarioService, TipoUsuarioSeedService],
})
export class UsuariosModule {}
