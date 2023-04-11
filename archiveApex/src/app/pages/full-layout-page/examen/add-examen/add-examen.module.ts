import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExamenRoutingModule } from './add-examen-routing.module';
import { AddExamenComponent } from './add-examen.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddExamenComponent],
  imports: [
    CommonModule,
    AddExamenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AddExamenModule { }
