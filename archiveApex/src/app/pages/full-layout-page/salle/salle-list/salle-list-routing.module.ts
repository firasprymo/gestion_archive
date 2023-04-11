import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalleListComponent } from './salle-list.component';

const routes: Routes = [{
  path: '',
  component: SalleListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalleListRoutingModule { }
