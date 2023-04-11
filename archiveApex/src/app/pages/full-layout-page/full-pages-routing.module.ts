import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FullLayoutPageComponent} from 'app/pages/full-layout-page/full-layout-page.component';
import {SalleListComponent} from './salle/salle-list/salle-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'show-salle',
                component: SalleListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FullPagesRoutingModule {
}
