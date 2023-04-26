import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowNomenclatureComponent } from './show-nomenclature.component';
import {NomenclatureResolvers} from '../../../../../shared/resolver/nomenclature.resolvers';

const routes: Routes = [{
  path:'',
  component: ShowNomenclatureComponent,
  resolve:  {
    nomenclatures: NomenclatureResolvers,
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowNomenclatureRoutingModule { }
