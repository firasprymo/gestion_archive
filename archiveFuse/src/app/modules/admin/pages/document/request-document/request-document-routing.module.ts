import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestDocumentComponent} from './request-document.component';
import {
    DocumentPendingRequestsResolvers,
    DocumentRequestsResolvers
} from '../../../../../shared/resolver/document-requests.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';


const routes: Routes = [{
    path: '',
    component: RequestDocumentComponent,
    resolve: {
        documents: DocumentPendingRequestsResolvers,
        user:ActiveUserResolvers
    }
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestDocumentRoutingModule { }
