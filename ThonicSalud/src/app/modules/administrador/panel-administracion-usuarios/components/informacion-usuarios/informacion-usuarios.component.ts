import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../../../../services/firebase/firestore.service';

@Component({
  selector: 'app-informacion-usuarios',
  templateUrl: './informacion-usuarios.component.html',
  styleUrl: './informacion-usuarios.component.scss'
})
export class InformacionUsuariosComponent {
  firestoreService = inject(FirestoreService);

  usuarios: any[] = [];
  especialistas: any[] = [];
  administradores: any[] = [];
  pacientes: any[] = [];
  actualizandoDatos: boolean = true;

  constructor() 
  { 
    this.ObtenerUsuarios(); 
    setTimeout(() => { this.AsignarUsuarios() }, 2000);
  }

  async ObtenerUsuarios()
  {
    this.firestoreService.ObtenerContenido("Usuarios").subscribe((usuariosObtenidos: any[]) => { 
      this.actualizandoDatos = true;
      this.usuarios = usuariosObtenidos;
      setTimeout(() => { this.actualizandoDatos = false }, 2000); 
    })
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
}
