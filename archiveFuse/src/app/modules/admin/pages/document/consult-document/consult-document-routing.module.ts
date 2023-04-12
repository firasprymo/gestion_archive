import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultDocumentComponent} from './consult-document.component';
import {DocumentRequestsResolvers} from '../../../../../shared/resolver/document-requests.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';


const routes: Routes = [{
    path: '',
    component: ConsultDocumentComponent,
    resolve: {
        documents: DocumentRequestsResolvers,
        user:ActiveUserResolvers
    }
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultDocumentRoutingModule { }
