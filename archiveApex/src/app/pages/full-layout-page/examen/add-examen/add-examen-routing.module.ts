import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExamenComponent } from './add-examen.component';

const routes: Routes = [{
  path: '', component: AddExamenComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExamenRoutingModule { }
