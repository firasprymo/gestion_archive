import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddDirectionRegionalRoutingModule} from './add-direction-regional-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {AddDirectionRegionalComponent} from './add-direction-regional.component';


@NgModule({
    declarations: [
        AddDirectionRegionalComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        AddDirectionRegionalRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class AddDirectionRegionalModule {
}
