import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ShowCentrePreArchiveRoutingModule} from './show-centre-pre-archive-routing.module';
import {ShowCentrePreArchiveComponent} from './show-centre-pre-archive.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ShowCentrePreArchiveComponent],
    imports: [
        CommonModule,
        ShowCentrePreArchiveRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ShowCentrePreArchiveModule { }
