import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { SocketIoModule } from 'ngx-socket-io';
import { UsuariosModule } from '../usuarios/usuarios.module';

@NgModule({
  declarations: [LoginComponent, MainComponent, ChatComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthorizationRoutingModule,

    SocketIoModule.forRoot({ url: 'http://localhost:3000' }),
    UsuariosModule
  ],
})
export class AuthorizationModule {}
