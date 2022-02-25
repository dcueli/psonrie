import { Validators } from '@angular/forms';

export interface ILoggedinUser {
	username: string | null | Validators;
	password: string | null | Validators;
}