import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SharedModule} from 'app/shared/shared.module';
import {FileManagerComponent} from './file-manager.component';
import {FileManagerDetailsComponent} from './details/details.component';
import {FileManagerListComponent} from './list/list.component';
import {fileManagerRoutes} from './file-manager.routing';
import {MaterialModule} from '../../shared/material/material.module';

@NgModule({
    declarations: [
        FileManagerComponent,
        FileManagerDetailsComponent,
        FileManagerListComponent
    ],
    imports: [
        RouterModule.forChild(fileManagerRoutes),
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTooltipModule,
        SharedModule,
        MaterialModule
    ]
})
export class FileManagerModule {
}
