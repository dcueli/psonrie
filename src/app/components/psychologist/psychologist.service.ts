import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import endpoints from '../../resources/endpoints/api.json';

import { IPsychologist } from '../../interfaces/psychologist/IPsychologist';

@Injectable({
	providedIn: 'root',
})
export class PsychologistService {

	private httpOptions = {
		headers: new HttpHeaders({ token: '123456' })
	};

	constructor(private http: HttpClient) { }

	getAll$(): Observable<IPsychologist[]> {
		return this.http.get<IPsychologist[]>(
			endpoints.psychologist.list.url,
			this.httpOptions
		);
	}

  getById(id: number | string) {
		return this.http.get<IPsychologist>(
			endpoints.psychologist.card.url.replace('{ID}', `${id}`),
			this.httpOptions
		);
  }
}