import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullPagesRoutingModule} from './full-pages-routing.module';
import {FullLayoutPageComponent} from './full-layout-page.component';
import {ShowFiliereModule} from './filiere/show-filiere/show-filiere.module';
import {AddFiliereModule} from './filiere/add-filiere/add-filiere.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ClassesModule} from './classes/classes.module';
import {EnseignantModule} from './enseignant/enseignant.module';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        ShowFiliereModule,
        AddFiliereModule,
        ReactiveFormsModule,
        ClassesModule,
        EnseignantModule
    ],
    declarations: [FullLayoutPageComponent]
})
export class FullPagesModule {
}
