import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocumentMaturePremierAgeRoutingModule} from './document-mature-premier-age-routing.module';
import {DocumentMaturePremierAgeComponent} from './document-mature-premier-age.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [DocumentMaturePremierAgeComponent],
    imports: [
        CommonModule,
        DocumentMaturePremierAgeRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class DocumentMaturePremierAgeModule {
}
