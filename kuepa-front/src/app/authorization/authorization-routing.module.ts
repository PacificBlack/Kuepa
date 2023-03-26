import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LOGIN } from "src/common/constants/rutas.routes";
import { LoginComponent } from "./pages/login/login.component";
import { MainComponent } from "./pages/main/main.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: LOGIN, component: LoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
