import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSalleRoutingModule } from './add-salle-routing.module';
import { AddSalleComponent } from './add-salle.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddSalleComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AddSalleRoutingModule
  ]
})
export class AddSalleModule { }
