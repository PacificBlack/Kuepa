import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SalasService } from './modules/salas/services/salas/salas.service';
import { TipoUsuarioSeedService } from './modules/usuarios/seeders/tipo-usuario-seed/tipo-usuario-seed.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tipo_usuario_seed_service: TipoUsuarioSeedService,
    private readonly salas_service: SalasService,
  ) {
    Promise.all([
      tipo_usuario_seed_service.SeedTipoUsuario(),
      salas_service.SeedSala(),
    ]);
  }
}
