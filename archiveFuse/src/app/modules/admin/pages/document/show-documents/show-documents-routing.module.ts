import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowDocumentsComponent} from './show-documents.component';
import {DocumentsResolvers} from '../../../../../shared/resolver/documents.resolvers';
import {ActiveUserResolvers} from "../../../../../shared/resolver/users.resolvers";

const routes: Routes = [{
    path: '',
    component: ShowDocumentsComponent,
    resolve: {
        documents: DocumentsResolvers,
        user: ActiveUserResolvers,
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowDocumentsRoutingModule { }
