import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCentreArchiveComponent} from './add-centre-archive.component';

const routes: Routes = [{
    path: '',
    component: AddCentreArchiveComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddCentreArchiveRoutingModule {
}
