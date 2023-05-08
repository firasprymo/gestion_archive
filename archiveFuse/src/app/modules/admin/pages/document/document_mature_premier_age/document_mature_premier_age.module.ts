import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Document_mature_premier_ageRoutingModule} from './document_mature_premier_age-routing.module';
import {Document_mature_premier_ageComponent} from './document_mature_premier_age.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [Document_mature_premier_ageComponent],
    imports: [
        CommonModule,
        Document_mature_premier_ageRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class Document_mature_premier_ageModule {
}
