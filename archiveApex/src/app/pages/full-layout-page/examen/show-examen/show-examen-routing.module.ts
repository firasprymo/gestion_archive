import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowExamenComponent } from './show-examen.component';

const routes: Routes = [{
  path: '', component: ShowExamenComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowExamenRoutingModule { }
