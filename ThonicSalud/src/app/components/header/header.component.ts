import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/firebase/auth.service';
import { SwalService } from '../../services/swal.service';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { UserService } from '../../services/data/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
	router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  firestoreService: FirestoreService = inject(FirestoreService);
  swalService: SwalService = inject(SwalService);

  nombreUsuario: string = "";

  constructor() 
  { 
    this.ObtenerNombreUsuario(); 
    this.userService.ObtenerDatosUsuarioLogueado();
  }

	ngOnInit(): void 
	{	}

  async ObtenerNombreUsuario()
  {
    const objetoUsuario: any = await this.firestoreService.ObtenerUsuarioPorMail(this.authService.ObtenerCorreoUsuario());
    this.nombreUsuario = objetoUsuario.nombre;
  }
  
  async CerrarSesion(): Promise<void>
	{
    const respuesta: boolean = await this.swalService.LanzarAlert("¿Estás seguro/a de que deseas cerrar sesión?", "question", "", true, "Cerrar sesión");

    if(respuesta)
    {
      this.authService.CerrarSesion();
      this.router.navigateByUrl("ingreso");
    }
  }
}
