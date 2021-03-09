import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoLoginGuard } from 'angular-auth-oidc-client';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { SecureddetailsComponent } from './secureddetails/secureddetails.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },  
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'secureddetails', component: SecureddetailsComponent , canActivate: [AutoLoginGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
