import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';


/**
 * To display the errors in toastr
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr: ToastrService) {}

  //define all errors here
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("** In Error interceptor --> "+ request.url );

    return next.handle(request).pipe(
      catchError(error => {
        console.log("** In Error interceptor --> " + error.status  );
        console.log("** In Error interceptor --> error details = ",error);

        if(error){
          switch (error.status) {
            case 400:
              if(error.error.errors){
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);                    
                  }
                }
                throw modalStateErrors;
              }
              else{
                this.toastr.error(error.statusText, error.status);
              }
              break;
          case 404:
            this.router.navigateByUrl('/errors');
            break;
          default:
              console.error("ERROR==> " ,error);
              if(request.url.includes(".well-known/openid-configuration"))
                this.toastr.error("Authetication server down. Please contact Administrator.");
              else
              this.toastr.error("An unexpected error occured. Please contact Administrator.");
              break;
          }
        }
        return throwError(error);
      })
    )
  }
}
