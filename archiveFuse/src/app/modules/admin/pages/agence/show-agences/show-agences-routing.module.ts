import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowAgenceComponent} from './show-agences.component';
import {AgencesResolvers} from '../../../../../shared/resolver/agences.resolvers';

const routes: Routes = [{
  path:'',
  component: ShowAgenceComponent,
  resolve:  {
    agences: AgencesResolvers,
    //agination:AgenceResolvers
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowAgenceRoutingModule { }
