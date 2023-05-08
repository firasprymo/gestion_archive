import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestConsultDocumentsComponent} from './request-consult-documents.component';
import {DocumentsResolvers} from '../../../../../shared/resolver/documents.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';
import {
    DocumentPendingRequestsResolvers, DocumentRequestsConsultResolvers,
    DocumentRequestsResolvers
} from "../../../../../shared/resolver/document-requests.resolvers";

const routes: Routes = [{
    path: '',
    component: RequestConsultDocumentsComponent,
    resolve: {
        documentLists: DocumentRequestsConsultResolvers,
        user: ActiveUserResolvers,
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestConsultDocumentsRoutingModule { }
