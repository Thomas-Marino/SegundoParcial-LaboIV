import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/data/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  firestoreService: FirestoreService = inject(FirestoreService);
  router: Router = inject(Router);

  nombreUsuario: string = "";

  constructor() 
  { 
    this.ObtenerNombreUsuario();
    this.userService.ObtenerDatosUsuarioLogueado();
  }

  async ObtenerNombreUsuario()
  {
    const objetoUsuario: any = await this.firestoreService.ObtenerUsuarioPorMail(this.authService.ObtenerCorreoUsuario());
    console.log("Usuario obtenido" + JSON.stringify(objetoUsuario));
    this.nombreUsuario = objetoUsuario.nombre;
  }
}
