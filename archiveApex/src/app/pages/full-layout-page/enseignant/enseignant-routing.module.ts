import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddEnseignantComponent} from './add-enseignant/add-enseignant.component';
import {ShowEnseignantComponent} from './show-enseignant/show-enseignant.component';

const routes: Routes = [
  {
    path: 'add-enseignant',
    component: AddEnseignantComponent
  },
  {
    path: 'edit-enseignant/:id',
    component: AddEnseignantComponent
  },
  {
    path: 'show-enseignant',
    component: ShowEnseignantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }
