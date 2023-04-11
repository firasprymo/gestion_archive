import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EnseignantRoutingModule} from './enseignant-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AddEnseignantComponent} from './add-enseignant/add-enseignant.component';
import {ShowEnseignantComponent} from './show-enseignant/show-enseignant.component';

@NgModule({
    declarations: [AddEnseignantComponent, ShowEnseignantComponent],
    imports: [
        CommonModule,
        EnseignantRoutingModule,
        ReactiveFormsModule
    ]
})
export class EnseignantModule {
}
