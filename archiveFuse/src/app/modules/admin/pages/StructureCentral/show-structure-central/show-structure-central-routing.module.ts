import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowStructureCentralComponent } from './show-structure-central.component';

const routes: Routes = [{
  path:'',
  component: ShowStructureCentralComponent,
  resolve:  {
    //structureCentrals: StructureCentralResolvers,
    //agination:StructureCentralResolvers
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowStructureCentralRoutingModule { }
