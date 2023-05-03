import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddCentrePreArchiveComponent} from './add-centre-pre-archive.component';
import {
    centrePreArchivesByIdResolver,
} from '../../../../../shared/resolver/centre-pre-archives.resolvers';

const routes: Routes = [{
    path: '',
    component: AddCentrePreArchiveComponent,
    resolve: {
        centrePreArchive: centrePreArchivesByIdResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddCentrePreArchiveRoutingModule {
}
