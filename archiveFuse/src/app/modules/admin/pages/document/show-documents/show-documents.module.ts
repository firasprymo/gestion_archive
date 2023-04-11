import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowDocumentsRoutingModule} from './show-documents-routing.module';
import {ShowDocumentsComponent} from './show-documents.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ShowDocumentsComponent
    ],
    imports: [
        CommonModule,
        ShowDocumentsRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowDocumentsModule {
}
