import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddAgenceComponent} from './add-agence.component';
import {StructureCentralResolvers} from '../../../../../shared/resolver/structure-central.resolvers';
import {AgencesByIdResolver} from '../../../../../shared/resolver/agences.resolvers';

const routes: Routes = [{
    path: '',
    component: AddAgenceComponent,
    resolve: {
        structureCentrals: StructureCentralResolvers,
        agence: AgencesByIdResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddAgenceRoutingModule {
}
