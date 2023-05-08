import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Document_mature_premier_ageComponent} from './document_mature_premier_age.component';
import {
    DocumentPendingRequestsResolvers,
    DocumentRequestsResolvers
} from '../../../../../shared/resolver/document-requests.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';


const routes: Routes = [{
    path: '',
    component: Document_mature_premier_ageComponent,
    resolve: {
        documents: DocumentPendingRequestsResolvers,
        user:ActiveUserResolvers
    }
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Document_mature_premier_ageRoutingModule { }
