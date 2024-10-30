import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, User } from '@angular/fire/auth'
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

export interface authResponse
{
	huboError : boolean;
	mensajeError? : string;
	mensajeExito? : string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	auth = inject(AngularFireAuth);
	router = inject(Router);

	constructor() {}
  
	async IniciarSesion(correo:string, password:string) : Promise<authResponse>
	{
		let authResponse:authResponse = {huboError: false};
		try
		{
			const loginResponse = await this.auth.signInWithEmailAndPassword(correo, password).catch((error:FirebaseError) => {
				if(error.code == "auth/invalid-email") { error.message = "Asegurese de ingresar un email válido (ejemplo@correo.com)"; }
				else if(error.code == "auth/missing-password") { error.message = "Asegurese de ingresar una contraseña"; }
				else if(error.code == "auth/invalid-credential") { error.message = "Credenciales invalidas, verifique si el correo y la contraseña fueron ingresados correctamente"; }
				error.stack = ""; 
				authResponse.huboError = true;
				authResponse.mensajeError = error.message;
			});

			if(loginResponse)
			{
				console.log(`Usuario logueado existosamente! Correo: ${loginResponse.user?.email}`);
				authResponse.mensajeExito = "Ingreso de usuario exitoso! Redirigiendo a la pantalla de inicio...";
				localStorage.setItem("usuarioLogueado", correo.split("@")[0])
			}

			return authResponse;
		}
		catch(error:any)
		{
			console.error(error)
			authResponse.huboError = true;
			authResponse.mensajeError = error;
			return authResponse;
		}   
	}

	ObtenerSesion()
	{
		return this.auth.authState;
	}

	// async ObtenerUsuario(): Promise<string>
	// {
  //   return new Promise((resolve) => {
  //     this.auth.onAuthStateChanged((user) => {
  //       if(user && user.email) { resolve(user.email.split("@")[0]); }
  //       else { resolve(""); }
  //     })
  //   });
	// }

	ObtenerNombreUsuario(): string
	{
		const usuarioLogueado: string | null = localStorage.getItem("usuarioLogueado");
		
		if(usuarioLogueado) { return usuarioLogueado; }

		return "";
	}

	async CerrarSesion() : Promise<void>
	{
		if(this.ObtenerSesion())
		{
			this.auth.signOut();
			this.router.navigateByUrl("login");
			localStorage.removeItem("usuarioLogueado");
		}
		else
		{
			console.log("No hay ninguna sesion activa");
		}
	}
}