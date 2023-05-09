import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddUserComponent} from './add-user.component';
import {StructureCentralResolvers} from '../../../../../shared/resolver/structure-central.resolvers';
import {DirectionRegionalResolvers} from '../../../../../shared/resolver/direction-regional.resolvers';
import {AgencesResolvers} from '../../../../../shared/resolver/agences.resolvers';
import {UserByIdResolver} from '../../../../../shared/resolver/users.resolvers';
import {CentreArchivesResolvers} from '../../../../../shared/resolver/centre-archives.resolvers';
import {CentrePreArchivesResolvers} from '../../../../../shared/resolver/centre-pre-archives.resolvers';

const routes: Routes = [{
    path: '',
    component: AddUserComponent,
    resolve: {
        structureCentrals: StructureCentralResolvers,
        directionRegionals: DirectionRegionalResolvers,
        centreArchives: CentreArchivesResolvers,
        centrePreArchives: CentrePreArchivesResolvers,
        agences: AgencesResolvers,
        user: UserByIdResolver,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddUserRoutingModule {
}
