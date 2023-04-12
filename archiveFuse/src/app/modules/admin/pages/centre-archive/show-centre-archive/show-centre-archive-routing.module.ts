import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowCentreArchiveComponent} from './show-centre-archive.component';

const routes: Routes = [{
    path: '',
    component: ShowCentreArchiveComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowCentreArchiveRoutingModule {
}
