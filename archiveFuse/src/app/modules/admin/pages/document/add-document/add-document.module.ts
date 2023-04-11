import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdddocumentRoutingModule } from './add-document-routing.module';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {AddDocumentComponent} from './add-document.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AddDocumentComponent],
  imports: [
    CommonModule,
    AdddocumentRoutingModule,
      MaterialModule,
      ReactiveFormsModule
  ]
})
export class AddDocumentModule { }
