import { CommonModule } from '@angular/common';
// ---- Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { PanelAdministracionUsuariosComponent } from './panel-administracion-usuarios/panel-administracion-usuarios.component';
import { AltaUsuariosComponent } from './panel-administracion-usuarios/components/alta-usuarios/alta-usuarios.component';
import { AdministracionEspecialistasComponent } from './panel-administracion-usuarios/components/administracion-especialistas/administracion-especialistas.component';
import { InformacionUsuariosComponent } from './panel-administracion-usuarios/components/informacion-usuarios/informacion-usuarios.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TurnosComponent } from './turnos/turnos.component';

@NgModule({
  declarations: [
    PanelAdministracionUsuariosComponent,
    AltaUsuariosComponent,
    AdministracionEspecialistasComponent,
    InformacionUsuariosComponent,
    TurnosComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class AdministradorModule { }
