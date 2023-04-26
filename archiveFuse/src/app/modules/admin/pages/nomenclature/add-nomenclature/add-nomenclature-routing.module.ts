import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddNomenclatureComponent} from './add-nomenclature.component';
import {
    structureCentralByIdResolver,
} from '../../../../../shared/resolver/structure-central.resolvers';
import {NomenclatureByIdResolver, NomenclatureResolvers} from '../../../../../shared/resolver/nomenclature.resolvers';
import {DocumentsResolvers} from '../../../../../shared/resolver/documents.resolvers';

const routes: Routes = [{
    path: '',
    component: AddNomenclatureComponent,
    resolve: {
        nomenclature: NomenclatureByIdResolver,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddNomenclatureRoutingModule {
}
