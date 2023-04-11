import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClassesRoutingModule} from './classes-routing.module';
import {AddClassesComponent} from './add-classes/add-classes.component';
import {ShowClassesComponent} from './show-classes/show-classes.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [AddClassesComponent, ShowClassesComponent],
    imports: [
        CommonModule,
        ClassesRoutingModule,
        ReactiveFormsModule,
    ]
})
export class ClassesModule {
}
