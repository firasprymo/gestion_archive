import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalleListRoutingModule } from './salle-list-routing.module';
import { SalleListComponent } from './salle-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [SalleListComponent],
  imports: [
    CommonModule,
    SalleListRoutingModule,
    NgxDatatableModule
  ]
})
export class SalleListModule { }
