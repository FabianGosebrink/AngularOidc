import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oidcSecurityService: OidcSecurityService, private tokenservice: TokenService) { }

  get IsAuthenticated$(): Observable<boolean>{
    

    this.oidcSecurityService.isAuthenticated$.subscribe( data => { 
      if(data){
        this.tokenservice.saveToken(this.oidcSecurityService.getToken());
      }
    });

    return this.oidcSecurityService.isAuthenticated$;

  }

  get userData$(): Observable<any>{
      return this.oidcSecurityService.userData$;
  }
  
  logoff(): void {
    this.tokenservice.removeToken();
    this.tokenservice.removeRefreshToken();
    this.oidcSecurityService.revokeAccessToken();
    this.oidcSecurityService.revokeRefreshToken();
    this.oidcSecurityService.logoff();
  }

  checkAuth(): Observable<boolean>{
    return this.oidcSecurityService.checkAuth();
  }

  login(): void{
    this.oidcSecurityService.authorize({ customParams : { ui_locales: 'de-CH' }}); 
  }
  
}
