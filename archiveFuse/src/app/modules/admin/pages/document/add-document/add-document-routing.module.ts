import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddDocumentComponent} from './add-document.component';
import {documentByIdResolver, DocumentsResolvers} from '../../../../../shared/resolver/documents.resolvers';
import {NomenclatureResolvers} from '../../../../../shared/resolver/nomenclature.resolvers';


const routes: Routes = [{
    path: '',
    component: AddDocumentComponent,
    resolve: {
        document: documentByIdResolver,
        nomenclatures: NomenclatureResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdddocumentRoutingModule {
}
