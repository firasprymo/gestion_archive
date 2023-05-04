import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddDirectionRegionalComponent} from './add-direction-regional.component';
import {
    DirectionRegionalByIdResolver,
} from '../../../../../shared/resolver/direction-regional.resolvers';

const routes: Routes = [{
    path: '',
    component: AddDirectionRegionalComponent,
    resolve: {
        directionRegional: DirectionRegionalByIdResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddDirectionRegionalRoutingModule {
}
