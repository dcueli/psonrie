import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { PsychologistService } from '../psychologist.service';
import { IPsychologist } from '../../../interfaces/psychologist/IPsychologist';

// import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-psycholist-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PyschologistListComponent implements OnInit {
  selectedPsychologist$!: Observable<IPsychologist[]>;
  selectedId: number | string = 0;

  constructor(
		private psychologistService: PsychologistService, 
    private route: ActivatedRoute
	) { }

  ngOnInit(): void {
    this.selectedPsychologist$ = this.route.paramMap.pipe(
      switchMap(() => this.psychologistService.getAll$())
    );
  }
}
