import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCentreArchiveComponent} from './add-centre-archive.component';
import {
    centreArchivesByIdResolver,
    CentreArchivesResolvers
} from "../../../../../shared/resolver/centre-archives.resolvers";

const routes: Routes = [{
    path: '',
    component: AddCentreArchiveComponent,
    resolve:{
        centreArchive:centreArchivesByIdResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddCentreArchiveRoutingModule {
}
