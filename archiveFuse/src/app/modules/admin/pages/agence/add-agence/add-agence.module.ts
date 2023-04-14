import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddAgenceRoutingModule} from './add-agence-routing.module';
import {AddAgenceComponent} from './add-agence.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [AddAgenceComponent],
    imports: [
        CommonModule,
        AddAgenceRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class AddAgenceModule {
}
