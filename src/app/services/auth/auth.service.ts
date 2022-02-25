import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ToastController, Platform } from '@ionic/angular';
import { ManageStorage } from '../storage/manage.storage';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';
import * as _ from "lodash";
import endpoints from '../../resources/endpoints/api.json';

import { ILoggedinUser } from '../../interfaces/auth/ILoggedinUser';

@Injectable()
export class AuthService {

	private dummyCurrUser = environment.dummyUserSession;
	private storage = new ManageStorage();
	private httpOptions = {
		headers: new HttpHeaders({
			token: '123456'
		})
	};

	public authState = new BehaviorSubject(false);

	constructor(
		private router: Router,
		private platform: Platform,
		private http: HttpClient,
		public toastController: ToastController,
	) {
		this.platform.ready().then(() => {
			this.ifLoggedIn();
		});
	}

	public async ifLoggedIn() {
		const storageUser = await this.storage.get(this.dummyCurrUser.key);

		if (_.isEmpty(storageUser)) {
			await this.storage.set(this.dummyCurrUser.key, null);
			this.authState.next(false);
		} else {
			this.router.navigate(['psychologist/list']);
			this.authState.next(true);
		}
	}

	public async setLoggedInUser(currUser: ILoggedinUser) {
		return await this.storage.set(this.dummyCurrUser.key, currUser);
	}

	public async removeLoggedInUser() {
		return await this.storage.set(this.dummyCurrUser.key, null);
	}

	public login(currUser: ILoggedinUser) {
		const formData = new FormData();
		
		for (let field in currUser)
			formData.append(field, currUser[field]);

		return this.http.post(endpoints.login.url, formData, this.httpOptions);
	}

	public logout() {
		this.removeLoggedInUser();
		this.authState.next(false);
	}

	public isAuth() {
		return this.authState.value;
	}
}