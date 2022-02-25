import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { 
		path: '', 
		redirectTo: 'psychologist/list', 
		pathMatch: 'full'
	}, { 
		path: 'login', 
		component: LoginComponent
	}, {
		path: '**', 
		component: PageNotFoundComponent
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
			appRoutes, 
			{ preloadingStrategy: PreloadAllModules }
		)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
