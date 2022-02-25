import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { PsychologistService } from '../psychologist.service';
import { IPsychologist } from '../../../interfaces/psychologist/IPsychologist';

@Component({
  selector: 'app-psycholist-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class PyschologistCardComponent implements OnInit {
  psychologist$!: Observable<IPsychologist>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
		private psychologistService: PsychologistService, 
	) { }

  ngOnInit() {
    this.psychologist$ = this.route.paramMap.pipe(
      switchMap( (params: ParamMap) => this.psychologistService.getById(params.get('id')!) )
		);
  }

  gotoPsychologistList() {
    this.router.navigate(['/psychologist/list']);
  }
}
