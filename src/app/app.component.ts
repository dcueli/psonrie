import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

interface AvailableAppPages {
	title: string;
	url?: string;
	action?: any;
	icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: Array<AvailableAppPages> = [];

  constructor(        
    private router: Router,
    private platform: Platform,
    private authService: AuthService
  ) {
		this.init();
	}

	init() {
    this.platform.ready().then(() => {
      this.authService.authState.subscribe(state => {

      //   console.log(`app.component > this.authService.authState.subscribe :: ${state}`);

        if (state) {
					this.appPages = [
						{ title: 'Listado', url: '/psychologist/list', icon: 'list' },
						{ title: 'Cerrar sesión', action: () => this.authService.logout(), icon: 'exit' },
					];
					this.router.navigate(['/psychologist/list']);
        } else {
					this.appPages = [
						{ title: 'Login', url: '/psychologist/list', icon: 'list' },
					];
					this.router.navigate(['login']);
        }
      });

    });
  }	
}
