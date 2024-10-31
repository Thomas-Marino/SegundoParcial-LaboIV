import { Component, inject, ViewEncapsulation } from '@angular/core';
import { authResponse, AuthService } from '../../services/firebase/auth.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/firebase/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  encapsulation: ViewEncapsulation.None, // Desactiva el encapsulamiento de estilos para modificar mat-radio-button
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
  especialidadSeleccionada: string;
  archivoImagen1?: File;
  archivoImagen2?: File;
  archivoImagenPerfil?: File;
  mensajeImagen1: string;
  mensajeImagen2: string;
  mensajeImagenPerfil: string;

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
      imagen1: [null, [Validators.required,]], 
      imagen2: [null, [Validators.required,]], 
    });
    this.formEspecialista = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellido: ['', [Validators.required, Validators.maxLength(30)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(65), Validators.pattern(/^[0-9]\d*$/)]],
      dni: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8), Validators.pattern(/^[0-9]\d*$/)]],
      especialidad: ['', Validators.required],
      email: ['', [Validators.required,]], 
      clave: ['', [Validators.required,]], 
      imagenPerfil: [null, [Validators.required,]] 
    });
    this.especialidadSeleccionada = "";
    this.mensajeImagen1 = "Haga click para subir la imagen 1."
    this.mensajeImagen2 = "Haga click para subir la imagen 2."
    this.mensajeImagenPerfil = "Haga click para subir su imagen de perfil."
  }

  onArchivoSeleccionado(event: Event, imagen1: boolean = false): void 
  {
    const input: HTMLInputElement = <HTMLInputElement> event.target;

    if (input.files && input.files.length == 1) 
    {
      const archivoSeleccionado = input.files[0];
      
      if (this.tipoUsuario == "Especialista") 
      { 
        this.archivoImagenPerfil = archivoSeleccionado; 
        this.mensajeImagenPerfil = `Imagen seleccionada: ${archivoSeleccionado.name}`; 
      } 
      else if (this.tipoUsuario == "Paciente") 
      {
        if (imagen1) 
        { 
          this.archivoImagen1 = archivoSeleccionado; 
          this.mensajeImagen1 = `Imagen seleccionada: ${archivoSeleccionado.name}`; 
        } 
        else 
        { 
          this.archivoImagen2 = archivoSeleccionado;
          this.mensajeImagen2 = `Imagen seleccionada: ${archivoSeleccionado.name}`; 
        }
      }
    }
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

    if(this.formPaciente.valid && this.archivoImagen1 && this.archivoImagen2)
    {
      const { nombre, apellido, edad, dni, obraSocial, email, clave} = this.formPaciente.value;
      await this.storageService.GuardarImagen(`Pacientes/${email}/imagen1.jpg`, this.archivoImagen1);
      await this.storageService.GuardarImagen(`Pacientes/${email}/imagen2.jpg`, this.archivoImagen2);
      
      // ---- Promesa que se resuelve después de 2 segundos para aguardar a que se guarde el contenido en fireStorage.
      await new Promise(resolve => setTimeout(resolve, 2000));

      const urlDescargaImg1 = await this.storageService.ObtenerUrlDescarga(`Pacientes/${email}/imagen1.jpg`);
      const urlDescargaImg2 = await this.storageService.ObtenerUrlDescarga(`Pacientes/${email}/imagen2.jpg`);
      
      const objetoPaciente = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        dni: dni,
        obraSocial: obraSocial,
        email: email,
        imagen1: urlDescargaImg1,
        imagen2: urlDescargaImg2,
        rol: "Paciente"
      };
  
      this.firestoreService.GuardarContenido("Usuarios", objetoPaciente);

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

  async RegistroEspecialista()
  {
    this.subiendoDatos = true;

    if(this.formEspecialista.valid && this.archivoImagenPerfil)
    {
      const { nombre, apellido, edad, dni, especialidad, email, clave} = this.formEspecialista.value;
      await this.storageService.GuardarImagen(`Especialistas/${email}/imagenPerfil.jpg`, this.archivoImagenPerfil);

      // ---- Promesa que se resuelve después de 2 segundos para aguardar a que se guarde el contenido en fireStorage.
      await new Promise(resolve => setTimeout(resolve, 2500));

      const urlDescargaImgPerfil = await this.storageService.ObtenerUrlDescarga(`Especialistas/${email}/imagenPerfil.jpg`);
      
      const objetoEspecialista = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        dni: dni,
        especialidad: especialidad,
        email: email,
        imagenPerfil: urlDescargaImgPerfil,
        rol: "Especialista",
        habilitado: false
      };

      this.firestoreService.GuardarContenido("Usuarios", objetoEspecialista);

      const estadoRegistro: authResponse = await this.authService.RegistrarUsuario(email, clave);
      this.subiendoDatos = false;
    
      if(!estadoRegistro.huboError) 
      {
        await this.swalService.LanzarAlert("Registro del especialista exitoso!", "success", estadoRegistro.mensajeExito);
        this.router.navigateByUrl("/landing");
      }
      else { this.swalService.LanzarAlert("Error en el registro del especialista!", "error", estadoRegistro.mensajeError); }    
    }
  }
}
