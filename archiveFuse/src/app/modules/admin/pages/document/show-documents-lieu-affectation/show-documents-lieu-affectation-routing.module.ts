import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowDocumentsLieuAffectationComponent} from './show-documents-lieu-affectation.component';
import {
    DocumentsByLieuAffectationResolvers,
} from '../../../../../shared/resolver/documents.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';

const routes: Routes = [{
    path: '',
    component: ShowDocumentsLieuAffectationComponent,
    resolve: {
        documents: DocumentsByLieuAffectationResolvers,
        user: ActiveUserResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowDocumentsLieuAffectationRoutingModule {
}
