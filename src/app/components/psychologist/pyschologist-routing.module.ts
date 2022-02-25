import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../services/auth/guard.service';

import { PyschologistListComponent } from './list/list.component';
import { PyschologistCardComponent } from './card/card.component';

const pyschologistRoutes: Routes = [
	{
    path: 'psychologist/list',
		component: PyschologistListComponent,
		canActivate: [AuthGuard]
  }, {
    path: 'psychologist/card/:id',
		component: PyschologistCardComponent,
		canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pyschologistRoutes)],
  exports: [RouterModule],
})
export class PyschologistRoutingModule {}
