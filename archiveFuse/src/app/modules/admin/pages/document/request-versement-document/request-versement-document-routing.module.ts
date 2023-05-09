import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestVersementDocumentComponent} from './request-versement-document.component';
import {DocumentRequestsVersementResolvers} from '../../../../../shared/resolver/document-requests.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';


const routes: Routes = [{
    path: '',
    component: RequestVersementDocumentComponent,
    resolve: {
        documents: DocumentRequestsVersementResolvers,
        user: ActiveUserResolvers
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestVersementDocumentRoutingModule {
}
