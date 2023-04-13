import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowStructureCentralRoutingModule} from './show-structure-central-routing.module';
import {ShowStructureCentralComponent} from './show-structure-central.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [ShowStructureCentralComponent],
    imports: [
        CommonModule,
        ShowStructureCentralRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowStructureCentralModule {
}
