import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth.service';

export const usuarioLogueadoGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if(authService.ObtenerCorreoUsuario() != "") { return true; }

  else 
  {
    router.navigateByUrl("/error/unauthorized");
    return false;
  }
};
