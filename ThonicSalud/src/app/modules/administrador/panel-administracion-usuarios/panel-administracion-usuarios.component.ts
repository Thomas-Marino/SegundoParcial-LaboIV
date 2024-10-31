import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-administracion-usuarios',
  templateUrl: './panel-administracion-usuarios.component.html',
  styleUrl: './panel-administracion-usuarios.component.scss'
})
export class PanelAdministracionUsuariosComponent {
  mostrarComponente: string = 'altaUsuario';

  ActualizarComponente(componente: string) {
    this.mostrarComponente = componente;
  }
}
