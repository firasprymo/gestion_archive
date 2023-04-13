import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsultDocumentRoutingModule} from './consult-document-routing.module';
import {ConsultDocumentComponent} from './consult-document.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [ConsultDocumentComponent],
    imports: [
        CommonModule,
        ConsultDocumentRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ConsultDocumentModule {
}
