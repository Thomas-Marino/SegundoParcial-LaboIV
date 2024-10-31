import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { authResponse, AuthService } from '../../services/firebase/auth.service';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.scss'
})
export class IngresoComponent {
  authService: AuthService = inject(AuthService);
  firestoreService: FirestoreService = inject(FirestoreService);
  swalService: SwalService = inject(SwalService);
  router: Router = inject(Router);
  
  correoIngresado: string;
  claveIngresada: string;
  accesoRapidoSeleccionado: string;

  constructor() 
  {
    this.correoIngresado = "";
    this.claveIngresada = "";
    this.accesoRapidoSeleccionado = "";
  }

  LlenarCamposIngreso(rol: "Administrador" | "Especialista" | "Paciente"): void
  {
    switch (rol)
    {
      case "Administrador":
        this.correoIngresado = "adm.thonic@gmail.com";
        this.claveIngresada = "Administrador";
        break;
      case "Especialista":
        this.correoIngresado = "esp.thonic@hotmail.com";
        this.claveIngresada = "Especialista";
        break;
      case "Paciente":
        this.correoIngresado = "pac.thonic@outlook.com.ar";
        this.claveIngresada = "Paciente";
        break;

    }
  }

  async IniciarSesion(): Promise<void>
  {
    const estadoInicioSesion: authResponse = await this.authService.IniciarSesion(this.correoIngresado, this.claveIngresada);
  
    if(!estadoInicioSesion.huboError) 
    {
      const objetoUsuarioObtenido = await this.firestoreService.ObtenerUsuarioPorMail(this.correoIngresado);
      
      if(objetoUsuarioObtenido.rol == "Especialista" || objetoUsuarioObtenido.rol == "Administrador")
      {
        if(objetoUsuarioObtenido.habilitado)
        {
          await this.swalService.LanzarAlert("Inicio de sesión exitoso!", "success", estadoInicioSesion.mensajeExito);
          this.router.navigateByUrl("/inicio");
        }
        else
        {
          await this.swalService.LanzarAlert("Error en el inicio de sesión!", "error", "Su usuario aún no ha sido aprobado por un administrador...");
          await this.authService.CerrarSesion();
          console.log("Sesion cerrada");
        }
      }
      else 
      {
        await this.swalService.LanzarAlert("Inicio de sesión exitoso!", "success", estadoInicioSesion.mensajeExito);
        this.router.navigateByUrl("/inicio");
      } 
    }
    else { this.swalService.LanzarAlert("Error en el inicio de sesión", "error", estadoInicioSesion.mensajeError); }
  }
}
