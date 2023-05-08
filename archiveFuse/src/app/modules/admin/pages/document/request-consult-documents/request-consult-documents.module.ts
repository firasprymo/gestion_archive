import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestConsultDocumentsRoutingModule} from './request-consult-documents-routing.module';
import {RequestConsultDocumentsComponent} from './request-consult-documents.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        RequestConsultDocumentsComponent
    ],
    imports: [
        CommonModule,
        RequestConsultDocumentsRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class RequestConsultDocumentsModule {
}
