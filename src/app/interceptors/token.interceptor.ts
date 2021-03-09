import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/services/token/token.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    
  constructor(private tokenservice: TokenService) {}

  private getToken(){
    return this.tokenservice.getToken();
  }

  private getRefreshToken(){
    return this.tokenservice.getRefreshToken();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("** In token interceptor");
    
    var Id_Token =  this.getToken();
    console.log("1--> " + Id_Token, new Date());

    
    if(Id_Token){
      if(Id_Token != "undefined"){
    
        //adding token to the header
        request = request.clone( {
          setHeaders: {
            Authorization : `Bearer ${Id_Token}`
          }
        })
      }
    }

    return next.handle(request);
  }
}
