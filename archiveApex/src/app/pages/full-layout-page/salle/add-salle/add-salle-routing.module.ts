import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSalleComponent } from './add-salle.component';

const routes: Routes = [{
  path: '',
  component: AddSalleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSalleRoutingModule { }
