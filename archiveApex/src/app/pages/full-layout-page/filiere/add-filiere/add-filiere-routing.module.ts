import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddFiliereComponent} from './add-filiere.component';

const routes: Routes = [{
    path: '',
    component: AddFiliereComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddFiliereRoutingModule {
}
