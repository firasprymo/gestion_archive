import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestVersementDocumentTroisiemeRoutingModule} from './request-versement-document-troisieme-routing.module';
import {RequestVersementDocumentTroisiemeComponent} from './request-versement-document-troisieme.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [RequestVersementDocumentTroisiemeComponent],
    imports: [
        CommonModule,
        RequestVersementDocumentTroisiemeRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class RequestVersementDocumentTroisiemeModule {
}
