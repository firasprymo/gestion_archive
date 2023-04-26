import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddStructureCentralComponent} from './add-structure-central.component';
import {
    structureCentralByIdResolver,
} from '../../../../../shared/resolver/structure-central.resolvers';

const routes: Routes = [{
    path: '',
    component: AddStructureCentralComponent,
    resolve: {
        structureCentral: structureCentralByIdResolver
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddStructureCentralRoutingModule {
}
