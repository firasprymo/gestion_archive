import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddNomenclatureRoutingModule} from './add-nomenclature-routing.module';
import {AddNomenclatureComponent} from './add-nomenclature.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { FuseDateRangeModule } from '@fuse/components/date-range';


@NgModule({
    declarations: [AddNomenclatureComponent],
    imports: [
        CommonModule,
        AddNomenclatureRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FuseDateRangeModule,

    ]
})
export class AddNomenclatureModule {
}
