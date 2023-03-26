import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authorization_service: AuthorizationService,
    private usuario_service: UsuarioService
  ) {}
  ngOnInit(): void {}

  aviso = {
    alert: false,
    message: '',
  };

  public loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public login() {
    const { username, password } = this.loginForm.value;
    this.authorization_service.login(username, password).subscribe((res) => {
      if (res.message) {
        this.aviso.alert = true;
        this.aviso.message = res.message;
        this.loginForm.reset();
      } else {
        this.aviso.alert = false;
        this.router.navigateByUrl('/');
      }
    });
  }
}
