import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowDirectionRegionalRoutingModule} from './show-direction-regional-routing.module';
import {ShowDirectionRegionalComponent} from './show-direction-regional.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [ShowDirectionRegionalComponent],
    imports: [
        CommonModule,
        ShowDirectionRegionalRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowDirectionRegionalModule {
}
