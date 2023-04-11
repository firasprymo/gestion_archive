import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowExamenRoutingModule } from './show-examen-routing.module';
import { ShowExamenComponent } from './show-examen.component';

@NgModule({
  declarations: [ShowExamenComponent],
  imports: [
    CommonModule,
    ShowExamenRoutingModule
  ]
})
export class ShowExamenModule { }
