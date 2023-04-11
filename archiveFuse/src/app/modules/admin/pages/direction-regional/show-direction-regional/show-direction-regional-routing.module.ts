import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    InventoryBrandsResolver,
    InventoryCategoriesResolver, InventoryVendorsResolver
} from '../../../apps/ecommerce/inventory/inventory.resolvers';
import {SkillsResolvers} from '../../../../../shared/resolver/skills.resolvers';
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
