import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: "", redirectTo: "/landing", pathMatch: "full" },
  { path: "landing", component: LandingPageComponent },
  { path: "ingreso", component: IngresoComponent },
  { path: "registro", component: RegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
