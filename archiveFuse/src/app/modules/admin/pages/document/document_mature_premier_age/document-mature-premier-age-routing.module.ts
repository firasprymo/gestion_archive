import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocumentMaturePremierAgeComponent} from './document-mature-premier-age.component';
import {
    DocumentMaturePremierAgeResolver,
    DocumentPendingRequestsResolvers,
} from '../../../../../shared/resolver/document-requests.resolvers';
import {ActiveUserResolvers} from '../../../../../shared/resolver/users.resolvers';


const routes: Routes = [{
    path: '',
    component: DocumentMaturePremierAgeComponent,
    resolve: {
        documentRequests: DocumentMaturePremierAgeResolver,
        user:ActiveUserResolvers
    }
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentMaturePremierAgeRoutingModule { }
