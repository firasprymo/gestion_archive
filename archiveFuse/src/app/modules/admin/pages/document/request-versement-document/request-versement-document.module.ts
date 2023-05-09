import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestVersementDocumentRoutingModule} from './request-versement-document-routing.module';
import {RequestVersementDocumentComponent} from './request-versement-document.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [RequestVersementDocumentComponent],
    imports: [
        CommonModule,
        RequestVersementDocumentRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class RequestVersementDocumentModule {
}
