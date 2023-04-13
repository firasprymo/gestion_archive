import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCentreArchiveRoutingModule } from './add-centre-archive-routing.module';
import {AddCentreArchiveComponent} from './add-centre-archive.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../../shared/material/material.module';


@NgModule({
  declarations: [AddCentreArchiveComponent],
    imports: [
        CommonModule,
        AddCentreArchiveRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})
export class AddCentreArchiveModule { }
