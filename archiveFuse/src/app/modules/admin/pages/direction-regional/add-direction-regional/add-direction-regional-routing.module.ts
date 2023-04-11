import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainersResolvers} from '../../../../../shared/resolver/trainers.resolvers';
import {AddDirectionRegionalComponent} from './add-direction-regional.component';
import {StepsResolver} from '../../../../../shared/resolver/steps.resolver';

const routes: Routes = [{
    path: '',
    component: AddDirectionRegionalComponent,
    resolve: {
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddDirectionRegionalRoutingModule {
}
