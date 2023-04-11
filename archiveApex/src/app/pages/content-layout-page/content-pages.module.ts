import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginModule } from './login/login.module';



@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        LoginModule
    ],
    declarations: [
        ContentLayoutPageComponent
    ]
})
export class ContentPagesModule { }
