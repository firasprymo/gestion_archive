import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddClassesComponent} from './add-classes/add-classes.component';
import {ShowClassesComponent} from './show-classes/show-classes.component';

const routes: Routes = [
    {
        path: 'add-classes',
        component: AddClassesComponent
    },
    {
        path: 'edit-classes/:id',
        component: AddClassesComponent
    },
    {
        path: 'show-classes',
        component: ShowClassesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassesRoutingModule {
}
