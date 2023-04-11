import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddQuizComponent} from './add-quiz.component';
import {DirectionRegionalByIdResolver} from '../../../../../shared/resolver/direction-regional.resolvers';

const routes: Routes = [{
    path: '',
    component: AddQuizComponent
    , resolve: {
        directionRegional: DirectionRegionalByIdResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddQuizRoutingModule {
}
