import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowCentreArchiveRoutingModule } from './show-centre-archive-routing.module';
import {ShowCentreArchiveComponent} from './show-centre-archive.component';
import {MaterialModule} from '../../../../../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ShowCentreArchiveComponent],
  imports: [
    CommonModule,
    ShowCentreArchiveRoutingModule,
      MaterialModule,
      ReactiveFormsModule
  ]
})
export class ShowCentreArchiveModule { }
