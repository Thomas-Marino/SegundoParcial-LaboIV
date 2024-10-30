import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/firebase/auth.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
	router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  swalService: SwalService = inject(SwalService);
  constructor() {}

	ngOnInit(): void 
	{	}
  
  async CerrarSesion(): Promise<void>
	{
    const respuesta: boolean = await this.swalService.LanzarAlert("¿Estás seguro/a de que deseas cerrar sesión?", "question", "", true, "Cerrar sesión");

    if(respuesta)
    {
      this.authService.CerrarSesion();
      this.router.navigateByUrl("ingreso");
    }
  }

	EstoyEnIngreso(): boolean
	{
		if(this.router.url == "/ingreso") { return true; }
		return false;
	}

  EstoyEnLandingPage(): boolean
	{
		if(this.router.url == "/landing") { return true; }
		return false;
	}
}
