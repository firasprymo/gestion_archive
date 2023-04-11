import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowFiliereComponent} from './show-filiere.component';

const routes: Routes = [{
    path: '',
    component: ShowFiliereComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowFiliereRoutingModule {
}
