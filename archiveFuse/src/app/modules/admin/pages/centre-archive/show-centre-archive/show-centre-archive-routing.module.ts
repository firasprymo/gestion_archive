import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowCentreArchiveComponent} from './show-centre-archive.component';
import {CentreArchivesResolvers} from '../../../../../shared/resolver/centre-archives.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowCentreArchiveComponent,
    resolve: {
        centreArchives: CentreArchivesResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowCentreArchiveRoutingModule {
}
