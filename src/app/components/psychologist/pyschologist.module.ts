import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PyschologistRoutingModule } from './pyschologist-routing.module';

import { PyschologistListComponent } from './list/list.component';
import { PyschologistCardComponent } from './card/card.component';


@NgModule({
  imports: [
    CommonModule,
    PyschologistRoutingModule
  ],
  declarations: [
    PyschologistListComponent,
    PyschologistCardComponent
	]
})
export class PyschologistModule {}
