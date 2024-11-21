import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../../services/firebase/firestore.service';
import { Subscription } from 'rxjs';
import * as ExcelJS from 'exceljs';



@Component({
  selector: 'app-informacion-usuarios',
  templateUrl: './informacion-usuarios.component.html',
  styleUrl: './informacion-usuarios.component.scss'
})
export class InformacionUsuariosComponent implements OnInit, OnDestroy{
  firestoreService = inject(FirestoreService);

  usuarios: any[] = [];
  especialistas: any[] = [];
  administradores: any[] = [];
  pacientes: any[] = [];
  historiasClinicasObtenidas: any[] = [];
  historiaClinicaDetallada: any = {};
  actualizandoDatos: boolean = true;
  subs: Subscription = new Subscription();

  constructor() 
  { 
    this.ObtenerUsuarios(); 
    this.ObtenerHistoriasClinicas();
  }

  ngOnInit(): void 
  {
    setTimeout(() => { 
      this.AsignarUsuarios();
      this.actualizandoDatos = false; 
    }, 2000);
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  async ObtenerHistoriasClinicas(): Promise<void>
  {
    await new Promise<void>((resolve) => {
      const subHistorias = this.firestoreService.ObtenerContenido("HistoriasClinicas").subscribe(historias => {
        for(const historia of historias)
        {
          for(const usuario of this.usuarios)
          {
            if(historia.dniPaciente == usuario.dni) { this.historiasClinicasObtenidas.push(historia); }
          }
        }
      });

      this.subs.add(subHistorias);
      resolve();
    });
  }

  async ObtenerUsuarios()
  {
    await new Promise<void>((resolve) => {
      const subUsuarios = this.firestoreService.ObtenerContenido("Usuarios").subscribe((usuariosObtenidos: any[]) => { 
        this.actualizandoDatos = true;
        this.usuarios = usuariosObtenidos;
      });

      this.subs.add(subUsuarios);
      resolve();
    });
  }

  AsignarUsuarios()
  {
    for(const usuario of this.usuarios)
    {
      if(usuario.rol == "Especialista") { this.especialistas.push(usuario) }
      else if(usuario.rol == "Administrador") { this.administradores.push(usuario) }
      else if(usuario.rol == "Paciente") { this.pacientes.push(usuario) }
    }
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

  async DescargarXlsx(paciente: any)
  {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 20 },
      { header: 'Apellido', key: 'apellido', width: 20 },
      { header: 'Edad', key: 'edad', width: 10 },
      { header: 'DNI', key: 'dni', width: 20 },
      { header: 'Cantidad de turnos tomados', key: 'cantidadTurnosTomados', width: 30 },
      { header: 'Turnos tomados', key: 'turnosTomados', width: 40 },
      { header: 'Especialistas visitados', key: 'especialistasVisitados', width: 40 }
    ];

    let turnosPacienteObtenidos: any[] = [];

    let subs: Subscription = new Subscription();

    await new Promise<void>((resolve) => {
      const subTurnos = this.firestoreService.ObtenerContenido("Turnos").subscribe(turnos => {
        for(const turno of turnos)
        {
          if(turno.dniPaciente == paciente.dni) { turnosPacienteObtenidos.push(turno); }
        }
        subs.add(subTurnos);
        resolve();
      });
    });

    await new Promise<void>((resolve) => {
      const subEspecialistas = this.firestoreService.ObtenerContenido("Usuarios").subscribe(usuarios => {
        for(const usuario of usuarios)
        {
          for(const turno of turnosPacienteObtenidos)
          {
            if(turno.dniEspecialista == usuario.dni) { turno.nombreEspecialista = usuario.nombre; }
          }
        }
        subs.add(subEspecialistas);
        resolve();
      });
    });

    subs.unsubscribe();
    
    let stringFechasTurnosTomados: string = "";
    let stringEspecialistasVisitados: string = "";

    for(const turno of turnosPacienteObtenidos) 
    { 
      if(!stringFechasTurnosTomados.includes(turno.fecha)) { stringFechasTurnosTomados = stringFechasTurnosTomados + ` ${turno.fecha},`; }

      if(!stringEspecialistasVisitados.includes(turno.nombreEspecialista)) { stringEspecialistasVisitados = stringEspecialistasVisitados + ` ${turno.nombreEspecialista},` }
    }

    const data = {
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      edad: paciente.edad,
      dni:paciente.dni,
      cantidadTurnosTomados: turnosPacienteObtenidos.length,
      turnosTomados: stringFechasTurnosTomados,
      especialistasVisitados: stringEspecialistasVisitados
    };

    worksheet.addRow(data);

    worksheet.getRow(1).alignment = { horizontal: "center" };
    worksheet.getRow(2).alignment = { horizontal: "center" };

    workbook.xlsx.writeBuffer().then((buffer) => {
      // Crear un objeto Blob con los datos
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Descargar el archivo usando el API nativo de navegadores
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `turnos-${paciente.nombre}-${paciente.apellido}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
