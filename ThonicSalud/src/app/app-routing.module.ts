import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ---- Componentes
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { usuarioLogueadoGuard } from './guards/usuario-logueado.guard';
import { AltaTurnoComponent } from './components/alta-turno/alta-turno.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { MisPacientesComponent } from './components/mis-pacientes/mis-pacientes.component';

const routes: Routes = [
  { path: "", redirectTo: "/landing", pathMatch: "full" },
  { path: "landing", component: LandingPageComponent, data: {animation: 'LandingPage'} },
  { path: "ingreso", component: IngresoComponent, data: { animation: 'IngresoPage'} },
  { path: "registro", component: RegistroComponent, data: { animation: 'RegistroPage'} },
  { path: "inicio", component: InicioComponent, canActivate: [usuarioLogueadoGuard], data: { animation: 'HomePage'}  },
  { path: "mi-perfil", component: MiPerfilComponent, canActivate: [usuarioLogueadoGuard], data: { animation: 'LoggedPage' } },
  { path: "solicitar-turno", component: AltaTurnoComponent, canActivate: [usuarioLogueadoGuard], data: { animation: 'LoggedPage' } },
  { path: "mis-turnos", component: MisTurnosComponent, canActivate: [usuarioLogueadoGuard], data: { animation: 'LoggedPage' } },
  { path: "mis-pacientes", component: MisPacientesComponent, canActivate: [usuarioLogueadoGuard], data: { animation: 'LoggedPage' } },
  { path: "error", loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule) },
  { path: "administrador", loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
