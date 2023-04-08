import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ConnectedGuardService } from './auth/connected-guard.service';
import { GetDirectionRegionalComponent } from './DirectionRegional/get-direction-regional/get-direction-regional.component';
import { GetStructureCentralComponent } from './StructureCentral/get-structure-central/get-structure-central.component';
import { GetAgenceComponent } from './agence/get-agence/get-agence.component';
import { GetCentreArchiveComponent } from './CentreArchive/get-centre-archive/get-centre-archive.component';
import { UserFrontComponent } from './user-front/user-front.component';
import { ResponsableFrontComponent } from './responsable-front/responsable-front.component';


const routes: Routes = [
  {path:'sign-in', component: SignInComponent}, 
  {path: 'home', component: HomeComponent, canActivate : [ConnectedGuardService]},
  { path: 'get-direction-regional', component: GetDirectionRegionalComponent , canActivate: [ConnectedGuardService] },
  { path: 'get-structure-central', component: GetStructureCentralComponent , canActivate: [ConnectedGuardService] },
  { path: 'get-agence', component: GetAgenceComponent , canActivate: [ConnectedGuardService] },
  { path: 'get-centre-archive', component: GetCentreArchiveComponent , canActivate: [ConnectedGuardService] },
  { path: 'user-front', component: UserFrontComponent , canActivate: [ConnectedGuardService] },
  { path: 'responsable-front', component: ResponsableFrontComponent , canActivate: [ConnectedGuardService] },
  {path:'' ,redirectTo:'/home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: true,
    useHash: true
  }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
