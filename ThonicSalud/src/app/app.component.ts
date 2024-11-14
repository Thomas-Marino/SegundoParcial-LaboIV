import { Component, inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [ slideInAnimation ]
})
export class AppComponent {
  router: Router = inject(Router);
  
  title = 'ThonicSalud';

  estoyEnAnimacion: boolean = false;
  
  constructor() 
  {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) 
      {
        this.estoyEnAnimacion = true; 
        setTimeout(() => { this.estoyEnAnimacion = false; }, 500);
      }
    });
  }

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
