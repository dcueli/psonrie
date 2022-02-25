import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { IonicRouteStrategy } from '@ionic/angular';

import { AuthGuard } from './services/auth/guard.service';
import { AuthService } from './services/auth/auth.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { PyschologistModule } from './components/psychologist/pyschologist.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
		AppComponent,
    PageNotFoundComponent,
	],
  entryComponents: [],
  imports: [
		BrowserModule,
    FormsModule,
		ReactiveFormsModule,
		IonicModule.forRoot(), 
		HttpClientModule,
		PyschologistModule,
		AppRoutingModule,
	],
  providers: [
		AuthGuard,
    AuthService,
		FormBuilder,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
  bootstrap: [AppComponent],
})
export class AppModule {}
