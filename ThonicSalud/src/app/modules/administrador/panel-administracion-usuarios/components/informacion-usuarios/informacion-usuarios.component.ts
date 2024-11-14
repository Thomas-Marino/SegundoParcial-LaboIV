import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../../services/firebase/firestore.service';
import { Subscription } from 'rxjs';

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
}
