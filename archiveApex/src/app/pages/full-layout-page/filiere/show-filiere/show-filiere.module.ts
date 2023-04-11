import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowFiliereRoutingModule} from './show-filiere-routing.module';
import {ShowFiliereComponent} from './show-filiere.component';

@NgModule({
    declarations: [ShowFiliereComponent],
    imports: [
        CommonModule,
        ShowFiliereRoutingModule
    ]
})
export class ShowFiliereModule {
}
