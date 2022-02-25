import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser'
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { map, filter } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import { ILoggedinUser } from '../../interfaces/auth/ILoggedinUser';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
@NgModule({
	declarations: [LoginComponent],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
	],
	bootstrap: [LoginComponent]
})
export class LoginComponent implements OnInit {

	public res: any = {
		ok: false,
		message: null
	};
	public formData: ILoggedinUser = {
		username: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required)
	};

	@Input() loginForm!: FormGroup;
	constructor(
		private router: Router,
		private authService: AuthService,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group(this.formData);
		this.loginForm.valueChanges
    .pipe(
			// Aquí se puede controlar el valor de los campos para validarlos
			map((value) => value),
			filter(() => this.loginForm.valid)
    )
	}

	onSubmit(data: ILoggedinUser, $event: Event) {
		$event.preventDefault();

		this.authService.login(data).subscribe(
      async (success) => {
				this.res = { ok: true, message: 'Login success, redirecting...', success: success };
				await this.authService.setLoggedInUser(data);
				this.authService.ifLoggedIn();
			},
      (err) => this.res = { ok: false, message: 'Typed Username or Password is incorrect' }
	 	);
	}

}
