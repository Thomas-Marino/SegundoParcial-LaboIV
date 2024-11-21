import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { authResponse, AuthService } from '../../services/firebase/auth.service';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { SwalService } from '../../services/swal.service';

interface IUsuario {
  correo: string;
  clave: string;
  imagen: string;
  nombre: string;
}

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.scss',
  encapsulation: ViewEncapsulation.None, // Desactiva el encapsulamiento de estilos para modificar mat-radio-button
})
export class IngresoComponent {
  authService: AuthService = inject(AuthService);
  firestoreService: FirestoreService = inject(FirestoreService);
  swalService: SwalService = inject(SwalService);
  router: Router = inject(Router);
  
  correoIngresado: string;
  claveIngresada: string;
  accesoRapidoSeleccionado: string;

  Paciente1: IUsuario = { correo: "", clave: "", imagen: "", nombre: "" };
  Paciente2: IUsuario = { correo: "", clave: "", imagen: "", nombre: "" };
  Paciente3: IUsuario = { correo: "", clave: "", imagen: "", nombre: "" };
  Especialista1: IUsuario = { correo: "", clave: "", imagen: "", nombre: "" };
  Especialista2: IUsuario = { correo: "", clave: "", imagen: "", nombre: "" };
  Admin1: IUsuario = { correo: "", clave: "", imagen: "", nombre: "" };

  constructor() 
  {
    this.correoIngresado = "";
    this.claveIngresada = "";
    this.accesoRapidoSeleccionado = "";

    this.AsignarImagenes();
  }

  async AsignarImagenes(): Promise<void>
  {
    this.firestoreService.ObtenerContenido("Usuarios").subscribe(usuarios => {
      for(const usuario of usuarios)
      {
        if(usuario.email == "adm.thonic@gmail.com") { this.Admin1 = { correo: usuario.email, clave: "Administrador", imagen: usuario.imagenPerfil, nombre: usuario.nombre }; }
        else if(usuario.email == "esp.thonic@hotmail.com") { this.Especialista1 = { correo: usuario.email, clave: "Especialista", imagen: usuario.imagenPerfil, nombre: usuario.nombre }; }
        else if(usuario.email == "hivawim430@aqqor.com") { this.Especialista2 = { correo: usuario.email, clave: "Probando", imagen: usuario.imagenPerfil, nombre: usuario.nombre }; }
        else if(usuario.email == "tanedis536@opposir.com") { this.Paciente1 = { correo: usuario.email, clave: "Paciente", imagen: usuario.imagen1, nombre: usuario.nombre }; }
        else if(usuario.email == "molese3101@lineacr.com") { this.Paciente2 = { correo: usuario.email, clave: "Paciente", imagen: usuario.imagen1, nombre: usuario.nombre }; }
        else if(usuario.email == "pac.thonic@outlook.com.ar") { this.Paciente3 = { correo: usuario.email, clave: "Paciente", imagen: usuario.imagen1, nombre: usuario.nombre }; }
      }
    })
  }

  LlenarCamposIngreso(correo: string, clave: string): void
  {
    this.correoIngresado = correo;
    this.claveIngresada = clave;
  }

  async IniciarSesion(): Promise<void>
  {
    const estadoInicioSesion: authResponse = await this.authService.IniciarSesion(this.correoIngresado, this.claveIngresada);
  
    if(!estadoInicioSesion.huboError) 
    {
      const objetoUsuarioObtenido = await this.firestoreService.ObtenerUsuarioPorMail(this.correoIngresado);
      
      const fechaActual = new Date();
      const fecha = fechaActual.toLocaleDateString();
      const horario = fechaActual.toLocaleTimeString();

      const objetoDatosIngreso = {
        usuario: this.correoIngresado,
        fecha: fecha,
        horario: horario
      }

      this.firestoreService.GuardarContenido("Ingresos", objetoDatosIngreso);

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
