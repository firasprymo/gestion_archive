import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddDirectionRegionalComponent} from './add-direction-regional.component';

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
