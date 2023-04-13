import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowCentrePreArchiveComponent} from './show-centre-pre-archive.component';
import {CentrePreArchivesResolvers} from '../../../../../shared/resolver/centre-pre-archives.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowCentrePreArchiveComponent,
    resolve: {
        centrePreArchives: CentrePreArchivesResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowCentrePreArchiveRoutingModule {
}
