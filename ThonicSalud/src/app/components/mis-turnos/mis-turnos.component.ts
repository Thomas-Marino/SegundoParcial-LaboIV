import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { authResponse, AuthService } from '../../services/firebase/auth.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../services/firebase/storage.service';
import { UserService } from '../../services/data/user.service';
import { Turno } from '../../interfaces/ITurno';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.scss'
})
export class MisTurnosComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  swalService = inject(SwalService);
  firestoreService = inject(FirestoreService);
  storageService = inject(StorageService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  cargandoDatos: boolean;

  subscripciones: Subscription = new Subscription();
  subscripcionObtenerTurnos = new Subscription()

  rating = 6;

  turnosObtenidos: any[];
  turnosEspecialista: any[];
  turnosPaciente: any[];
  especialistasObtenidos: any[];
  historiasClinicasObtenidas: any[];
  historiaClinicaDetallada: any = {};
  especialistasObtenidosBackup: any[] = [];
  turnosObtenidosBackup: any[] = [];
  turnosObtenidosPacienteBackup: any[] = [];
  turnosObtenidosEspecialistaBackup: any[] = [];
  pacientesBackup: any[] = [];
  filtroGeneral: string = "";
  pacientesAtendidos: string[];
  pacientesObtenidos: any[];
  filtroEspecialidad: string;
  filtroEspecialista: string;
  filtroPaciente: string;  

  turnoSeleccionado: any;
  mensajeEstado: string;
  mensajeResenia: string;

  alturaPaciente: number | null;
  pesoPaciente: number | null;
  temperaturaPaciente: number | null;
  presionPaciente: number | null;
  diagnosticoPaciente: string;
  detalleDiagnosticoPaciente: string;

  constructor() 
  {
    this.userService.ObtenerDatosUsuarioLogueado();

    this.cargandoDatos = true;
    this.turnosObtenidos = [];
    this.turnosEspecialista = [];
    this.turnosPaciente = [];
    this.especialistasObtenidos = [];
    this.pacientesObtenidos = [];
    this.historiasClinicasObtenidas = [];
    this.filtroEspecialidad = "";
    this.filtroEspecialista = "";
    this.filtroPaciente = "";
    this.turnoSeleccionado = null;
    this.mensajeEstado = "";
    this.mensajeResenia = "";
    this.alturaPaciente = null;
    this.pesoPaciente = null;
    this.temperaturaPaciente = null;
    this.presionPaciente = null;
    this.diagnosticoPaciente = "";
    this.detalleDiagnosticoPaciente = "";
    this.pacientesAtendidos = [];

    this.ObtenerEspecialistas();
    this.ObtenerPacientes();
    this.ObtenerHistoriasClinicas();
  }

  ngOnInit(): void 
  {
    setTimeout(() => { this.ObtenerTurnos(); }, 2000);
  }

  ngOnDestroy(): void 
  {
    this.subscripciones.unsubscribe();
  }

  ObtenerEspecialistas(): void
  {
    this.especialistasObtenidos.length = 0;
    const especialistasSubscription = this.firestoreService.ObtenerContenido("Usuarios").subscribe(usuarios => {
      for(const usuario of usuarios)
      {
        if(usuario.rol == "Especialista") 
        { 
          this.especialistasObtenidos.push(usuario); 
          this.especialistasObtenidosBackup.push(usuario); 
        }
      }
    });

    this.subscripciones.add(especialistasSubscription);
  }


  ObtenerPacientes(): void
  {
    this.pacientesObtenidos.length = 0;
    this.pacientesBackup.length = 0;
    
    const pacientesSubscription: Subscription = this.firestoreService.ObtenerContenido("Usuarios").subscribe(usuarios => {
      for(const usuario of usuarios)
      {
        if(usuario.rol == "Paciente") 
        { 
          this.pacientesObtenidos.push(usuario); 
          this.pacientesBackup.push(usuario);
        }
      }
    });

    this.subscripciones.add(pacientesSubscription);
  }
  
  ObtenerHistoriasClinicas(): void
  {
    const HistoriasClinicasSubscription: Subscription = this.firestoreService.ObtenerContenido("HistoriasClinicas").subscribe(historias => {
      this.historiasClinicasObtenidas.length = 0;
      for(const historia of historias)
      {
        this.historiasClinicasObtenidas.push(historia);
      }
    });

    this.subscripciones.add(HistoriasClinicasSubscription);
  }

  ObtenerTurnos(): void
  {
    const turnosSubscription = this.firestoreService.ObtenerContenido("Turnos").subscribe(turnos => {
      this.turnosObtenidos.length = 0;
      this.turnosPaciente.length = 0;
      this.turnosEspecialista.length = 0;
      this.turnosObtenidosBackup.length = 0;
      this.turnosObtenidosPacienteBackup.length = 0;
      this.turnosObtenidosEspecialistaBackup.length = 0;
      for(const turno of turnos)
      {
        for(const especialista of this.especialistasObtenidos)
        {
          for(const paciente of this.pacientesObtenidos)
          {
            if(turno.dniEspecialista == especialista.dni && turno.dniPaciente == paciente.dni)
            {
              const objetoTurnoTabla: any = {
                id: turno.id,
                fecha: turno.fecha,
                horario: turno.horario,
                dniEspecialista: turno.dniEspecialista, 
                dniPaciente: turno.dniPaciente,
                estado: turno.estado,
                mensajeEstado: turno.mensajeEstado,
                valoracionConsulta: turno.valoracionConsulta,
                comentarioValoracion: turno.comentarioValoracion,
                nombreEspecialista: especialista.nombre,
                apellidoEspecialista: especialista.apellido,
                especialidadEspecialista: especialista.especialidad,
                imagenPerfilEspecialista: especialista.imagenPerfil,
                nombrePaciente: paciente.nombre,
                apellidoPaciente: paciente.apellido,
                imagen1Paciente: paciente.imagen1,
                imagen2Paciente: paciente.imagen2,
                historiaClinica: ""
              }

              for(const historia of this.historiasClinicasObtenidas)
              {
                if(historia.dniPaciente == turno.dni) { objetoTurnoTabla.historiaClinica = historia; }
              }

              this.turnosObtenidos.push(objetoTurnoTabla);
              if(objetoTurnoTabla.dniEspecialista == this.userService.dniUsuarioLogueado && this.userService.rolUsuarioLogueado == "Especialista")
              {
                this.turnosEspecialista.push(objetoTurnoTabla);
                this.turnosObtenidosEspecialistaBackup.push(objetoTurnoTabla);
              }
              else if(objetoTurnoTabla.dniPaciente == this.userService.dniUsuarioLogueado && this.userService.rolUsuarioLogueado == "Paciente")
              {
                this.turnosPaciente.push(objetoTurnoTabla);
                this.turnosObtenidosPacienteBackup.push(objetoTurnoTabla);
              }
            }
          }
        }
      }

      this.cargandoDatos = false;
    });

    // this.subscripcionObtenerTurnos.unsubscribe();
    this.subscripcionObtenerTurnos.add(turnosSubscription);
  }

  Filtrar(filtroIngresado: string): void
  {
    let coincidenciaEncontrada: boolean = false;
    if(filtroIngresado)
    {
      let nuevosTurnosPaciente: any[] = [];
      let nuevosTurnosEspecialista: any[] = [];
      console.log(this.turnosPaciente)

      if(this.turnosObtenidosPacienteBackup.length > 0)
      {
        for(const turno of this.turnosObtenidosPacienteBackup)
        {
          if(JSON.stringify(turno).includes(filtroIngresado))
          {
            coincidenciaEncontrada = true;
            nuevosTurnosPaciente.push(turno);
          }
        }
      }

      if(this.turnosObtenidosEspecialistaBackup.length > 0)
      {
        for(const turno of this.turnosObtenidosEspecialistaBackup)
        {
          if(JSON.stringify(turno).includes(filtroIngresado)) 
          {
            coincidenciaEncontrada = true; 
            nuevosTurnosEspecialista.push(turno); 
          }
        }   
      }

      this.turnosPaciente.length = 0;
      this.turnosEspecialista.length = 0;

      if(coincidenciaEncontrada) 
      {
        if(nuevosTurnosEspecialista.length > 0) { this.turnosEspecialista = [...nuevosTurnosEspecialista]; }
  
        if(nuevosTurnosPaciente.length > 0) { this.turnosPaciente = [...nuevosTurnosPaciente]; }
      }
    }
    else 
    { 
      this.turnosPaciente.length = 0;
      this.turnosEspecialista.length = 0;
      this.turnosPaciente = [...this.turnosObtenidosPacienteBackup];
      this.turnosEspecialista = [...this.turnosObtenidosEspecialistaBackup];
    }
  }

  FiltrarEspecialistas(filtroIngresado: string): void
  {
    if(filtroIngresado)
    {
      let nuevosEspecialistas: any[] = [];
      for(const especialista of this.especialistasObtenidosBackup)
      {
        const nombreEspecialista: string = especialista.nombre;
        if(nombreEspecialista.includes(filtroIngresado)) { nuevosEspecialistas.push(especialista); }
      }
      this.especialistasObtenidos.length = 0;
      this.especialistasObtenidos = nuevosEspecialistas;
    }
    else 
    { 
      this.especialistasObtenidos = [...this.especialistasObtenidosBackup];
    }

    if(this.subscripcionObtenerTurnos && !this.subscripcionObtenerTurnos.closed) 
    {
      this.subscripcionObtenerTurnos.unsubscribe(); 
      this.subscripcionObtenerTurnos = new Subscription();
    }

    this.ObtenerTurnos();
  }

  FiltrarEspecialidades(filtroIngresado: string): void
  {
    if(filtroIngresado != "")
    {
      let nuevosEspecialistas: any[] = [];
      for(const especialista of this.especialistasObtenidosBackup)
      {
        const especialidadEspecialista: string = especialista.especialidad;
        if(especialidadEspecialista.includes(filtroIngresado)) {console.log("coincidencia"); nuevosEspecialistas.push(especialista); }
      }
      this.especialistasObtenidos.length = 0;
      this.especialistasObtenidos = nuevosEspecialistas;
    }
    else 
    { 
      this.especialistasObtenidos = [...this.especialistasObtenidosBackup];
    }

    if(this.subscripcionObtenerTurnos && !this.subscripcionObtenerTurnos.closed) 
    {
      this.subscripcionObtenerTurnos.unsubscribe(); 
      this.subscripcionObtenerTurnos = new Subscription();
    }

    this.ObtenerTurnos();
  }

  FiltrarPacientes(filtroIngresado: string): void
  {
    this.cargandoDatos = true;
    this.ObtenerPacientes()

    setTimeout(() => {
      if(filtroIngresado != "")
      {
        let nuevosPacientes: any[] = [];
        for(const paciente of this.pacientesObtenidos)
        {
          const nombrePaciente: string = `${paciente.nombre} ${paciente.apellido}`;
          if(nombrePaciente.includes(filtroIngresado)) { nuevosPacientes.push(paciente); }
        }
        this.pacientesObtenidos.length = 0;
        this.pacientesObtenidos = nuevosPacientes;
      }
      else 
      { 
        this.ObtenerEspecialistas();
        this.ObtenerPacientes()
        this.ObtenerTurnos(); 
      }
    }, 2000);


    setTimeout(() => { 
      this.ObtenerTurnos(); 
      this.cargandoDatos = false;
    }, 2000);
    this.filtroPaciente = "";
  }

  CancelarTurno(turno: any, mensajeEstadoIngresado: string): void //Añadir mensaje de cancelacion
  {
    const objetoTurnoNuevo: Turno = {
      dniEspecialista: turno.dniEspecialista,
      dniPaciente: turno.dniPaciente,
      fecha: turno.fecha,
      horario: turno.horario,
      estado: "Cancelado",
      mensajeEstado: "Turno cancelado por: " + this.userService.rolUsuarioLogueado + " " + mensajeEstadoIngresado,
      comentarioValoracion: "",
      valoracionConsulta: 0
    }
    console.log(turno.id);
    this.firestoreService.ModificarContenido("Turnos", turno.id, objetoTurnoNuevo);
  }

  AceptarTurno(turno: any, mensajeEstadoIngresado: string): void
  {
    const objetoTurnoNuevo: Turno = {
      dniEspecialista: turno.dniEspecialista,
      dniPaciente: turno.dniPaciente,
      fecha: turno.fecha,
      horario: turno.horario,
      estado: "Aceptado",
      mensajeEstado: mensajeEstadoIngresado,
      comentarioValoracion: "",
      valoracionConsulta: 0
    }

    this.firestoreService.ModificarContenido("Turnos", turno.id, objetoTurnoNuevo);
    this.ObtenerTurnos();
  }

  RechazarTurno(turno: any, mensajeEstadoIngresado: string): void
  {
    const objetoTurnoNuevo: Turno = {
      dniEspecialista: turno.dniEspecialista,
      dniPaciente: turno.dniPaciente,
      fecha: turno.fecha,
      horario: turno.horario,
      estado: "Rechazado",
      mensajeEstado: mensajeEstadoIngresado,
      comentarioValoracion: "",
      valoracionConsulta: 0
    }

    this.firestoreService.ModificarContenido("Turnos", turno.id, objetoTurnoNuevo);
    this.ObtenerTurnos();
  }

  AsignarTurnoSeleccionado(turno: any): void
  {
    this.turnoSeleccionado = turno;
    console.log(this.turnoSeleccionado)
  }

  FinalizarTurno(turno: any, mensaje: string): void
  {
    const objetoTurnoNuevo: Turno = {
      dniEspecialista: turno.dniEspecialista,
      dniPaciente: turno.dniPaciente,
      fecha: turno.fecha,
      horario: turno.horario,
      estado: "Finalizado",
      mensajeEstado: mensaje,
      valoracionConsulta: 0,
      comentarioValoracion: "",
    }
    
    let crearHistoriaClinica: boolean = true; // Me va a servir para identificar si debo crear una historia o modificar una existente.

    for(const paciente of this.pacientesObtenidos) 
    {
      if(paciente.dni == turno.dniPaciente) // Encuentro el paciente al que se le asignó el turno
      {
        for(const especialista of this.especialistasObtenidos)
        {
          if(especialista.dni == turno.dniEspecialista) // Encuentro el especialista que atendió al paciente
          {
            const objetoHistoriaClinica: any = {
              especialidadVisitada: especialista.especialidad,
              nombreEspecialista: especialista.nombre,
              dniEspecialista: especialista.dni,
              fechaVisita: turno.fecha,
              horarioVisita: turno.horario,
              alturaPaciente: this.alturaPaciente,
              pesoPaciente: this.pesoPaciente,
              temperaturaPaciente: this.temperaturaPaciente,
              presionPaciente: this.presionPaciente,
              diagnosticoPaciente: this.diagnosticoPaciente,
              detalleDiagnosticoPaciente: this.detalleDiagnosticoPaciente
            }
            
            let historiaExistente: any = {}
            for(const historia of this.historiasClinicasObtenidas)
            {
              if(historia.dniPaciente == paciente.dni) // Si encuentro una coincidencia significa que el paciente ya tiene historia clinica, por lo tanto debo modificarla. 
              { 
                crearHistoriaClinica = false;
                historiaExistente = historia; 
              }
            }
    
            if(crearHistoriaClinica) 
            {
              const nuevaHistoriaClinica: any = {
                nombrePaciente: `${paciente.nombre} ${paciente.apellido}`,
                edadPaciente: paciente.edad, 
                dniPaciente: paciente.dni,
                visitas: [ objetoHistoriaClinica ] 
              }

              this.firestoreService.GuardarContenido("HistoriasClinicas", nuevaHistoriaClinica);
            }
            else
            {
              const historiaClinicaModificada: any = {
                nombrePaciente: historiaExistente.nombrePaciente,
                edadPaciente: historiaExistente.edadPaciente, 
                dniPaciente: historiaExistente.dniPaciente,
                visitas: [ 
                  ...historiaExistente.visitas, 
                  objetoHistoriaClinica
                ]
              }

              this.firestoreService.ModificarContenido("HistoriasClinicas", historiaExistente.id, historiaClinicaModificada);
            }
          }
        }
      }
    }

    this.mensajeEstado = "";
    this.firestoreService.ModificarContenido("Turnos", turno.id, objetoTurnoNuevo);
    this.ObtenerTurnos();
  }

  GuardarValoracionUsuario(turno: any, comentario: string): void
  {
    const objetoTurnoNuevo: Turno = {
      dniEspecialista: turno.dniEspecialista,
      dniPaciente: turno.dniPaciente,
      fecha: turno.fecha,
      horario: turno.horario,
      estado: "Finalizado",
      mensajeEstado: turno.mensajeEstado,
      valoracionConsulta: this.rating,
      comentarioValoracion: comentario
    }
    this.mensajeResenia = "";
    this.rating = 5;
    this.firestoreService.ModificarContenido("Turnos", turno.id, objetoTurnoNuevo);
    this.ObtenerTurnos();
  }

  RelacionarHistoriaClinica(dniPaciente: string | number): void
  {
    let historiaAsignada: boolean = false;
    for(const historia of this.historiasClinicasObtenidas)
    {
      if(dniPaciente == historia.dniPaciente) 
      { 
        this.historiaClinicaDetallada = historia;
        historiaAsignada = true; 
      }
    }

    if(!historiaAsignada) { this.historiaClinicaDetallada = {}; }
  }
}