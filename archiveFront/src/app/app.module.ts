import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AddDirectionRegionalComponent } from './DirectionRegional/add-direction-regional/add-direction-regional.component';
import { GetDirectionRegionalComponent } from './DirectionRegional/get-direction-regional/get-direction-regional.component';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule } from '@angular/forms';
import { AddStructureCentralComponent } from './StructureCentral/add-structure-central/add-structure-central.component';
import { GetStructureCentralComponent } from './StructureCentral/get-structure-central/get-structure-central.component';
import { AddAgenceComponent } from './agence/add-agence/add-agence.component';
import { GetAgenceComponent } from './agence/get-agence/get-agence.component';
import { AddCentreArchiveComponent } from './CentreArchive/add-centre-archive/add-centre-archive.component';
import { GetCentreArchiveComponent } from './CentreArchive/get-centre-archive/get-centre-archive.component';
import { UserFrontComponent } from './user-front/user-front.component';
import { ResponsableFrontComponent } from './responsable-front/responsable-front.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    AddDirectionRegionalComponent,
    GetDirectionRegionalComponent,
    AddStructureCentralComponent,
    GetStructureCentralComponent,
    AddAgenceComponent,
    GetAgenceComponent,
    AddCentreArchiveComponent,
    GetCentreArchiveComponent,
    UserFrontComponent,
    ResponsableFrontComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
