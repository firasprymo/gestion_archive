import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFiliereRoutingModule } from './add-filiere-routing.module';
import {ShowFiliereComponent} from '../show-filiere/show-filiere.component';
import {AddFiliereComponent} from './add-filiere.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AddFiliereComponent],
  imports: [
    CommonModule,
    AddFiliereRoutingModule,
      ReactiveFormsModule
  ]
})
export class AddFiliereModule { }
