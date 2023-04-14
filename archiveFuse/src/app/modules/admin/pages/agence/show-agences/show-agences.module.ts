import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ShowAgenceComponent} from './show-agences.component';
import {ShowAgenceRoutingModule} from './show-agences-routing.module';


@NgModule({
    declarations: [ShowAgenceComponent],
    imports: [
        CommonModule,
        ShowAgenceRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowAgenceModule {
}
