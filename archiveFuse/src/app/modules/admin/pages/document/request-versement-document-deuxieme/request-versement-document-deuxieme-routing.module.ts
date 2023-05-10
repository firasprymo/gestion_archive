import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestVersementDocumentDeuxiemeComponent} from './request-versement-document-deuxieme.component';
import {DocumentRequestsVersementResolvers} from '../../../../../shared/resolver/document-requests.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';
import {DocumentRequestsVersementDeuxiemeResolvers} from '../../../../../shared/resolver/document-requests.resolvers';


const routes: Routes = [{
    path: '',
    component: RequestVersementDocumentDeuxiemeComponent,
    resolve: {
        documents: DocumentRequestsVersementDeuxiemeResolvers,
        user: ActiveUserResolvers
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestVersementDocumentDeuxiemeRoutingModule {
}
