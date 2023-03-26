import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './authorization/pages/chat/chat.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
  },
  {
    path: '',
    title: 'Bienvenido',
    component: ChatComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
