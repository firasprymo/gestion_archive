import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddStructureCentralComponent} from './add-structure-central.component';
import {DirectionRegionalResolvers} from '../../../../../shared/resolver/direction-regional.resolvers';

const routes: Routes = [{
    path: '',
    component: AddStructureCentralComponent,
    resolve: {
        directions: DirectionRegionalResolvers
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddStructureCentralRoutingModule {
}
