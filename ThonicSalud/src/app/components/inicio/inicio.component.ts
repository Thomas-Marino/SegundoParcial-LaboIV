import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  authService: AuthService = inject(AuthService);
  firestoreService: FirestoreService = inject(FirestoreService);
  router: Router = inject(Router);

  rolUsuarioLogueado: string = "";

  constructor() { this.ObtenerRolUsuarioLogueado(); }
  
  async ObtenerRolUsuarioLogueado(): Promise<void>
  {
    const objetoUsuarioLogueado: any = await this.firestoreService.ObtenerUsuarioPorMail(this.authService.ObtenerCorreoUsuario());

    this.rolUsuarioLogueado = objetoUsuarioLogueado.rol;
  }
}
