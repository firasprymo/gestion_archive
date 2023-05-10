import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestVersementDocumentDeuxiemeRoutingModule} from './request-versement-document-deuxieme-routing.module';
import {RequestVersementDocumentDeuxiemeComponent} from './request-versement-document-deuxieme.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [RequestVersementDocumentDeuxiemeComponent],
    imports: [
        CommonModule,
        RequestVersementDocumentDeuxiemeRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class RequestVersementDocumentDeuxiemeModule {
}
