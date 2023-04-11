import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PassExamComponent} from './pass-exam.component';

const routes: Routes = [
    {
        path: '',
        component: PassExamComponent,
        data: {
            layout: 'modern'
        },
        resolve: {
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PassExamRoutingModule {
}
