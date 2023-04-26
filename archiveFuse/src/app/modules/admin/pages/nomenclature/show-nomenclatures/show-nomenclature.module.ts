import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowNomenclatureRoutingModule} from './show-nomenclature-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ShowNomenclatureComponent} from './show-nomenclature.component';


@NgModule({
    declarations: [ShowNomenclatureComponent],
    imports: [
        CommonModule,
        ShowNomenclatureRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowNomenclatureModule {
}
