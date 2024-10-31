import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { usuarioLogueadoGuard } from './guards/usuario-logueado.guard';

const routes: Routes = [
  { path: "", redirectTo: "/landing", pathMatch: "full" },
  { path: "landing", component: LandingPageComponent },
  { path: "ingreso", component: IngresoComponent },
  { path: "registro", component: RegistroComponent },
  { path: "inicio", component: InicioComponent, canActivate: [usuarioLogueadoGuard] },
  { path: "error", loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule) },
  { path: "administrador", loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
