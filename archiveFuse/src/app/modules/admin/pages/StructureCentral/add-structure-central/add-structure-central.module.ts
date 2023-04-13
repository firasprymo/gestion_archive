import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddStructureCentralRoutingModule} from './add-structure-central-routing.module';
import {AddStructureCentralComponent} from './add-structure-central.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [AddStructureCentralComponent],
    imports: [
        CommonModule,
        AddStructureCentralRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class AddStructureCentralModule {
}
