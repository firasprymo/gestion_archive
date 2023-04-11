import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddDocumentComponent} from './add-document.component';


const routes: Routes = [{
    path: '',
    component: AddDocumentComponent,
    resolve: {
        // trainers: TrainersResolvers,
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdddocumentRoutingModule {
}
