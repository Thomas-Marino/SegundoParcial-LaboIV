import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { authResponse, AuthService } from '../../services/firebase/auth.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/firebase/storage.service';
import { UserService } from '../../services/data/user.service';
import { Turno } from '../../interfaces/ITurno';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrl: './alta-turno.component.scss',
  encapsulation: ViewEncapsulation.None, // Desactiva el encapsulamiento de estilos para modificar mat-radio-button
})
export class AltaTurnoComponent implements OnInit {
  userService = inject(UserService);
  swalService = inject(SwalService);
  firestoreService = inject(FirestoreService);
  storageService = inject(StorageService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  cargandoDatos: boolean;

  especialidadSeleccionada: string;
  especialistaSeleccionado: any;
  diaSeleccionado: string;
  horarioSeleccionado: string;

  especialidadesDisponibles: string[];
  especialistasDisponibles: any[];
  diasDisponibles: any[];
  horariosDisponibles: any[];
  pacientesObtenidos: any[];
  pacienteSeleccionado: any;

  especialistasObtenidos: any[];

  formPaciente!: FormGroup;
  formAdministrador!: FormGroup;

  constructor() 
  {
    this.cargandoDatos = true;

    this.formPaciente = this.formBuilder.group({
      especialidad: ['', [Validators.required]],
      especialista: ['', [Validators.required]],
      dia: ['', [Validators.required]],
      horario: ['', [Validators.required]],
    });

    this.formAdministrador = this.formBuilder.group({
      paciente: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      especialista: ['', [Validators.required]],
      dia: ['', [Validators.required]],
      horario: ['', [Validators.required]],
    });

    this.especialidadSeleccionada = "";
    this.especialistaSeleccionado = null;
    this.pacienteSeleccionado = null;
    this.diaSeleccionado = "";
    this.horarioSeleccionado = "";

    this.especialistasObtenidos = [];
    this.especialidadesDisponibles = [];
    this.especialistasDisponibles = [];
    this.diasDisponibles = [];
    this.horariosDisponibles = [];
    this.pacientesObtenidos = [];
    this.ObtenerEspecialistas();
    this.ObtenerDiasDisponibles();
    this.ObtenerPacientes();
  }

  ngOnInit(): void 
  {
    setTimeout(() => {
      // this.ObtenerEspecialidades();
      this.cargandoDatos = false;
      console.log(`rolusuariologueado ${this.userService.rolUsuarioLogueado}`)

    }, 2000);
  }

  ObtenerEspecialidades(): void
  {
    for(const especialista of this.especialistasObtenidos) 
    { 
      if(!this.especialidadesDisponibles.includes(especialista.especialidad)) { this.especialidadesDisponibles.push(especialista.especialidad); } 
    }
  }

  ObtenerEspecialistas(): void
  {
    this.firestoreService.ObtenerContenido("Usuarios").subscribe(usuarios => {
      for(const usuario of usuarios)
      {
        if(usuario.rol == "Especialista") { this.especialistasObtenidos.push(usuario); }
      }
      this.ObtenerEspecialidades();
    });
  }

  ObtenerPacientes(): void
  {
    this.firestoreService.ObtenerContenido("Usuarios").subscribe(usuarios => {
      for(const usuario of usuarios)
      {
        if(usuario.rol == "Paciente") { this.pacientesObtenidos.push(usuario); }
      }
    });
  }

  ObtenerEspecialistasDisponibles(especialidadIngresada: string): void
  {
    this.especialistasDisponibles.length = 0;
    for(const especialista of this.especialistasObtenidos)
    {
      if(especialista.especialidad == especialidadIngresada) { this.especialistasDisponibles.push(especialista); }
    }
  }

  AsignarEspecialista(especialistaSeleccionado: any)
  {
    this.formPaciente.patchValue({especialista: especialistaSeleccionado.dni});
    this.formAdministrador.patchValue({especialista: especialistaSeleccionado.dni});
    this.especialistaSeleccionado = especialistaSeleccionado;
    this.horarioSeleccionado = "";
    this.diaSeleccionado = "";
    console.log(`especialista seleccionado: ${JSON.stringify(especialistaSeleccionado)}`);
  }

  AsignarPaciente(pacienteSeleccionado: any)
  {
    this.formAdministrador.patchValue({paciente: pacienteSeleccionado.dni});
    this.pacienteSeleccionado = pacienteSeleccionado;
    this.horarioSeleccionado = "";
    this.diaSeleccionado = "";
    console.log(`paciente seleccionado: ${JSON.stringify(pacienteSeleccionado)}`);
  }

  ObtenerDiasDisponibles(): void
  {
    let fecha: Date = new Date();

    while(this.diasDisponibles.length != 15) 
    {
      if(new Date(fecha).getDay() !== 0) { this.diasDisponibles.push(`${this.ParsearDia(fecha.getDay())} ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`); }
      fecha.setDate(fecha.getDate() + 1);
    }
  }

  ObtenerHorariosDisponibles(fechaSeleccionada: string): void
  {
    this.horariosDisponibles.length = 0;
    let dni: number = 0;

    if(this.userService.rolUsuarioLogueado == "Administrador") { dni = this.pacienteSeleccionado.dni; }
    else if(this.userService.rolUsuarioLogueado == "Paciente") { dni = this.userService.dniUsuarioLogueado; }
    
    let horariosNoDisponibles: string[] = [];
    let horarios: string[] = [];
    this.firestoreService.ObtenerContenido("Turnos").subscribe(turnos => {
      for(const turno of turnos)
      {
        if(turno.fecha == fechaSeleccionada && (turno.dniPaciente == dni || turno.dniEspecialista == this.especialistaSeleccionado.dni) && turno.estado != "Cancelado")
        {
          console.log("Turno ocupado: " + turno.horario)
          horariosNoDisponibles.push(turno.horario);
        }
      }

      if(fechaSeleccionada.split(" ")[0] == "Sábado")
      {
        horarios = [ "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00" ];
      }
      else 
      {
        horarios = [ "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00" ];
      }

      for(const horario of horarios)
      {
        if(!horariosNoDisponibles.includes(horario)) { this.horariosDisponibles.push(horario); }
      }
    });
  }

  ParsearDia(dia: number): string
  {
    if(dia == 0) { return "Domingo"; }
    else if(dia == 1) { return "Lunes"; }
    else if(dia == 2) { return "Martes"; }
    else if(dia == 3) { return "Miércoles"; }
    else if(dia == 4) { return "Jueves"; }
    else if(dia == 5) { return "Viernes"; }
    else { return "Sábado"; }
  }

  AsignarFecha(fechaIngresada: string)
  {
    this.formPaciente.patchValue({dia: fechaIngresada});
    this.diaSeleccionado = fechaIngresada;
    this.ObtenerHorariosDisponibles(this.diaSeleccionado);
    console.log("dia seleccionado: " + this.diaSeleccionado);
  }

  AsignarHorario(horarioSeleccionado: string)
  {
    this.formPaciente.patchValue({horario: horarioSeleccionado});
    this.horarioSeleccionado = horarioSeleccionado;
    console.log("horario seleccionado: " + this.horarioSeleccionado);
  }

  SolicitarTurno()
  {
    try 
    {
      let dni: number = 0;

      if(this.userService.rolUsuarioLogueado == "Administrador") { dni = this.pacienteSeleccionado.dni; }
      else if(this.userService.rolUsuarioLogueado == "Paciente") { dni = this.userService.dniUsuarioLogueado; }

      const objetoTurno: Turno = { 
        dniEspecialista: this.especialistaSeleccionado.dni, 
        dniPaciente: dni.toString(), 
        fecha: this.diaSeleccionado, 
        horario: this.horarioSeleccionado, 
        estado: "Pendiente",
        mensajeEstado: "",
        valoracionConsulta: 0,
        comentarioValoracion: ""
      };

      this.firestoreService.GuardarContenido("Turnos", objetoTurno);
      this.swalService.LanzarAlert("Turno agendado exitosamente!", "success", "El turno fue agendado y queda a la espera de la aprobación por parte del especialista. Puedes ver tu turno en la sección 'Mis turnos'!");
      this.formPaciente.reset();
      this.formAdministrador.reset();
      this.diaSeleccionado = "";
      this.horarioSeleccionado = "";
      this.pacienteSeleccionado = null;
      this.especialistaSeleccionado = null;
    }
    catch(error) { this.swalService.LanzarAlert("Error al agendar el turno", "error", `${error}`); }
  }
}