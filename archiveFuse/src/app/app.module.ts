import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRouteSnapshot, ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {FuseModule} from '@fuse';
import {FuseConfigModule} from '@fuse/services/config';
import {FuseMockApiModule} from '@fuse/lib/mock-api';
import {CoreModule} from 'app/core/core.module';
import {appConfig} from 'app/core/config/app.config';
import {mockApiServices} from 'app/mock-api';
import {LayoutModule} from 'app/layout/layout.module';
import {AppComponent} from 'app/app.component';
import {appRoutes} from 'app/app.routing';
import {MaterialModule} from './shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { ConsultDocumentComponent } from './modules/admin/pages/document/consult-document/consult-document.component';
import { ShowCentreArchiveComponent } from './modules/admin/pages/centre-archive/show-centre-archive/show-centre-archive.component';
import { AddCentreArchiveComponent } from './modules/admin/pages/centre-archive/add-centre-archive/add-centre-archive.component';
import { AddStructureCentralComponent } from './modules/admin/pages/StructureCentral/add-structure-central/add-structure-central.component';
import { ShowStructureCentralComponent } from './modules/admin/pages/StructureCentral/show-structure-central/show-structure-central.component';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        ConsultDocumentComponent,
        ShowCentreArchiveComponent,
        AddCentreArchiveComponent,
        AddStructureCentralComponent,
        ShowStructureCentralComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,
        MaterialModule,
        // Layout module of your application
        LayoutModule,
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        ReactiveFormsModule,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
