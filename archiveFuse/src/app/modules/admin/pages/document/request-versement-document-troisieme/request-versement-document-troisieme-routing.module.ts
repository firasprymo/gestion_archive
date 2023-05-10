import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestVersementDocumentTroisiemeComponent} from './request-versement-document-troisieme.component';
import {
    DocumentRequestsVersementResolvers,
    DocumentRequestsVersementTroisiemeResolvers
} from '../../../../../shared/resolver/document-requests.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';


const routes: Routes = [{
    path: '',
    component: RequestVersementDocumentTroisiemeComponent,
    resolve: {
        documents: DocumentRequestsVersementTroisiemeResolvers,
        user: ActiveUserResolvers
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestVersementDocumentTroisiemeRoutingModule {
}
