import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddUserComponent} from './add-user.component';
import {documentByIdResolver} from '../../../../../shared/resolver/documents.resolvers';
import {NomenclatureResolvers} from '../../../../../shared/resolver/nomenclature.resolvers';
import {StructureCentralResolvers} from '../../../../../shared/resolver/structure-central.resolvers';
import {DirectionRegionalResolvers} from '../../../../../shared/resolver/direction-regional.resolvers';
import {AgencesResolvers} from '../../../../../shared/resolver/agences.resolvers';

const routes: Routes = [{
    path: '',
    component: AddUserComponent,
    resolve: {
        structureCentrals: StructureCentralResolvers,
        directionRegionals: DirectionRegionalResolvers,
        agences: AgencesResolvers,
}
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddUserRoutingModule {
}
