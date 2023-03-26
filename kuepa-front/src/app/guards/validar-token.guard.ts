import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthorizationService } from '../authorization/services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(
    private authservice: AuthorizationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authservice.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authservice.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
}
