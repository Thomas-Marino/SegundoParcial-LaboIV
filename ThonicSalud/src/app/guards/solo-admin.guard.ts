import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth.service';
import { FirestoreService } from '../services/firebase/firestore.service';

export const soloAdminGuard: CanActivateFn = async (route, state) => {
  let authService = inject(AuthService);
  let firestoreService = inject(FirestoreService);
  let router = inject(Router);

  const objetoUsuarioLogueado: any = await firestoreService.ObtenerUsuarioPorMail(authService.ObtenerCorreoUsuario());

  if(objetoUsuarioLogueado.rol == "Administrador") { return true; }
  else 
  {
    router.navigateByUrl("/error/unauthorized");
    return false;
  }
};
