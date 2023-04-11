import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ToastrModule} from 'ngx-toastr';

import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import {AppComponent} from './app.component';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';
import {FullLayoutComponent} from './layouts/full/full-layout.component';

import {AuthService} from './shared/auth/auth.service';
import {AuthGuard} from './shared/auth/auth-guard.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SalleListModule} from './pages/full-layout-page/salle/salle-list/salle-list.module';
import {AddSalleModule} from './pages/full-layout-page/salle/add-salle/add-salle.module';
import {AddExamenModule} from './pages/full-layout-page/examen/add-examen/add-examen.module';
import {ShowExamenModule} from './pages/full-layout-page/examen/show-examen/show-examen.module';
import {AuthInterceptors} from './shared/auth/auth-interceptors';
import {ClassesModule} from './pages/full-layout-page/classes/classes.module';
import {DatePipe} from '@angular/common';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent],
    imports: [
        NgxDatatableModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        PerfectScrollbarModule,
        SalleListModule,
        AddSalleModule,
        AddExamenModule,
        ShowExamenModule,
        ClassesModule
    ],
    providers: [
        AuthService,
        DatePipe,
        AuthGuard,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptors, multi: true},

        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
