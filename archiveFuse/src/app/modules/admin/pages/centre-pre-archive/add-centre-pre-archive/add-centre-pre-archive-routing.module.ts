import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCentrePreArchiveComponent} from './add-centre-pre-archive.component';

const routes: Routes = [{
    path: '',
    component: AddCentrePreArchiveComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddCentrePreArchiveRoutingModule {
}
