import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LogoutComponent } from './logout/logout.component';
import { SecureddetailsComponent } from './secureddetails/secureddetails.component';

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://localhost:5001',
      redirectUrl: window.location.origin,
      

      clientId: 'clientangularSLO',
      scope: 'openid profile api1 offline_access roles',
      responseType: 'code',
      triggerAuthorizationResultEvent: true,
      postLogoutRedirectUri: `${window.location.origin}`,
      
      renewTimeBeforeTokenExpiresInSeconds: 0,
      silentRenew: false,
      
      //postLoginRoute: '/home',
      //forbiddenRoute: '/forbidden',
      //unauthorizedRoute: '/unauthorized',
      logLevel: LogLevel.Debug,
      historyCleanupOff: true,
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LogoutComponent,
    SecureddetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })

    //oidc-client
    ,AuthModule.forRoot()
  ],
  providers: [
    
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor , multi: true},

    //refresh issue
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    //oidc-client
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
