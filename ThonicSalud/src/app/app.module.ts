// ---- Angular
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
// ---- Variables de entorno
import { firebaseConfig } from './environments/apiconfig';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { InicioComponent } from './components/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    InicioComponent
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
    ErrorModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
