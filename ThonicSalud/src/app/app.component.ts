import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  router: Router = inject(Router);
  
  title = 'ThonicSalud';
  
	EstoyEnIngreso(): boolean
	{
		if(this.router.url == "/ingreso") { return true; }
		return false;
	}

  EstoyEnRegistro(): boolean
  {
    if(this.router.url == "/registro") { return true; }
		return false;
  }

  EstoyEnLandingPage(): boolean
	{
		if(this.router.url == "/landing") { return true; }
		return false;
	}
}
