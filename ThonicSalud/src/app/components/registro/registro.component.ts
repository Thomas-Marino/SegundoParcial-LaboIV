import { Component, inject } from '@angular/core';
import { authResponse, AuthService } from '../../services/firebase/auth.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/firebase/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  authService = inject(AuthService);
  swalService = inject(SwalService);
  firestoreService = inject(FirestoreService);
  storageService = inject(StorageService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  tipoUsuario: "Paciente" | "Especialista";
  subiendoDatos: boolean;
  formPaciente!: FormGroup;
  formEspecialista!: FormGroup;

  constructor() 
  {
    this.tipoUsuario = "Paciente";
    this.subiendoDatos = false;
    this.formPaciente = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      edad: ['', [Validators.required, Validators.max(99), Validators.pattern(/^[0-9]\d*$/)]],
      dni: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern(/^[0-9]\d*$/)]],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required,]], 
      clave: ['', [Validators.required,]], 
      imagen1: ['', [Validators.required,]], 
      imagen2: ['', [Validators.required,]], 
    });
    this.formEspecialista = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(65), Validators.pattern(/^[0-9]\d*$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.maxLength(7)]],
      especialidad: ['', Validators.required],
      email: ['', [Validators.required,]], 
      clave: ['', [Validators.required,]], 
      imagenPerfil: ['', [Validators.required,]] 
    });
  }

  async RegistrarUsuario(correo: string, password: string)
  {
    const estadoRegistro: authResponse = await this.authService.RegistrarUsuario(correo, password);
    
    if(!estadoRegistro.huboError) 
    {
      await this.swalService.LanzarAlert("Registro exitoso!", "success", estadoRegistro.mensajeExito);
      this.router.navigateByUrl("/landing");
    }
    else { this.swalService.LanzarAlert("Error en el registro!", "error", estadoRegistro.mensajeError); }
  }

  async RegistroPaciente()
  {
    this.subiendoDatos = true;
    const { nombre, apellido, edad, dni, obraSocial, email, clave, imagen1, imagen2 } = this.formPaciente.value;
    if(this.formPaciente.valid)
    {
      await this.storageService.GuardarImagen(`Pacientes/${email}/imagen1`, imagen1);
      await this.storageService.GuardarImagen(`Pacientes/${email}/imagen2`, imagen2);
      
      setTimeout(async () => {
        const urlDescargaImg1 = await this.storageService.ObtenerUrlDescarga(`Pacientes/${email}/imagen1`);
        const urlDescargaImg2 = await this.storageService.ObtenerUrlDescarga(`Pacientes/${email}/imagen2`);
        
        const objetoPaciente = {
          nombre: nombre,
          apellido: apellido,
          edad: edad,
          dni: dni,
          obraSocial: obraSocial,
          email: email,
          imagen1: urlDescargaImg1,
          imagen2: urlDescargaImg2
        };
  
        this.firestoreService.GuardarContenido("Pacientes", objetoPaciente);
      }, 1000);
      
      const estadoRegistro: authResponse = await this.authService.RegistrarUsuario(email, clave);
      
      this.subiendoDatos = false;
    
      if(!estadoRegistro.huboError) 
      {
        await this.swalService.LanzarAlert("Registro del paciente exitoso!", "success", estadoRegistro.mensajeExito);
        this.router.navigateByUrl("/landing");
      }
      else { this.swalService.LanzarAlert("Error en el registro del paciente!", "error", estadoRegistro.mensajeError); }    
    }
  }

  async IniciarSesion(correo: string, password: string)
  {
    const estadoInicioSesion: authResponse = await this.authService.IniciarSesion(correo, password);

    if(!estadoInicioSesion.huboError) 
    {
      await this.swalService.LanzarAlert("Inicio de sesión exitoso!", "success", estadoInicioSesion.mensajeExito);
      this.router.navigateByUrl("/landing");
    }
    else { this.swalService.LanzarAlert("Error en el inicio de sesión", "error", estadoInicioSesion.mensajeError); }
  }
}
