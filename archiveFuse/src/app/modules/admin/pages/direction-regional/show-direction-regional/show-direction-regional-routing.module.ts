import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowDirectionRegionalComponent} from './show-direction-regional.component';
import {DirectionRegionalResolvers} from '../../../../../shared/resolver/direction-regional.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowDirectionRegionalComponent,
    resolve: {
        directionRegionals: DirectionRegionalResolvers,
        paginations: DirectionRegionalResolvers
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowDirectionRegionalRoutingModule { }
