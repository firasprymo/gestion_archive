import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowDocumentsLieuAffectationRoutingModule} from './show-documents-lieu-affectation-routing.module';
import {ShowDocumentsLieuAffectationComponent} from './show-documents-lieu-affectation.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ShowDocumentsLieuAffectationComponent
    ],
    imports: [
        CommonModule,
        ShowDocumentsLieuAffectationRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowDocumentsLieuAffectationModule {
}
