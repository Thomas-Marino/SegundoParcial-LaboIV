// ---- Angular
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// ---- NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// ---- Modulos propios
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { AdministradorModule } from './modules/administrador/administrador.module';
import { ErrorModule } from './modules/error/error.module';
// ---- FireBase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
// ---- ng-recaptcha
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
// ---- Variables de entorno
import { firebaseConfig, recaptcha } from './environments/apiconfig';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AltaTurnoComponent } from './components/alta-turno/alta-turno.component';
import { MisTurnosComponent } from './components/mis-turnos/mis-turnos.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { MisPacientesComponent } from './components/mis-pacientes/mis-pacientes.component';
import { ResaltarOnHoverDirective } from './directives/resaltar-on-hover.directive';
import { DeshabilitarOnClickDirective } from './directives/deshabilitar-on-click.directive';
import { AgrandarOnHoverDirective } from './directives/agrandar-on-hover.directive';


@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    InicioComponent,
    AltaTurnoComponent,
    MisTurnosComponent,
    MiPerfilComponent,
    MisPacientesComponent,
    ResaltarOnHoverDirective,
    DeshabilitarOnClickDirective,
    AgrandarOnHoverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule, 
    AngularMaterialModule, 
    NgbModule,
    AdministradorModule,
    ErrorModule,
    RecaptchaModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
