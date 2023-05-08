import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestDocumentRoutingModule} from './request-document-routing.module';
import {RequestDocumentComponent} from './request-document.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [RequestDocumentComponent],
    imports: [
        CommonModule,
        RequestDocumentRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class RequestDocumentModule {
}
