import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddCentrePreArchiveRoutingModule} from './add-centre-pre-archive-routing.module';
import {AddCentrePreArchiveComponent} from './add-centre-pre-archive.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../../shared/material/material.module';



@NgModule({
  declarations: [AddCentrePreArchiveComponent],
    imports: [
        CommonModule,
        AddCentrePreArchiveRoutingModule,
        ReactiveFormsModule,
        MaterialModule,

    ]
})
export class AddCentrePreArchiveModule { }
