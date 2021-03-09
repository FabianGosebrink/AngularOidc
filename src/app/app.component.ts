import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testIS4App';

  /** 
   *
   */
   isAuthenticated = false;

  constructor(private authservice:AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("In App component ngOnInIt()");
    
    
    //Issue1: Use this code if dashboard route has canActivate: [AutoLoginGuard], works fine 
    //problem1 --> but it is redirecting to the original page eg:- http://localhost:4300/secureddetails will redirect to STS after login redirect to http://localhost:4300    
    //problem2 --> but Sign-out is not redirecting to logout page

    this.authservice.userData$.subscribe( data => {
      console.log("userdata ==>",data);
    });
    

    /*
    //Issue2: Use this code if dashboard route has canActivate: [AutoLoginGuard] 
    //problem3 --> but it is redirecting few times STS and dashboard ( console error: Http failure response for https://localhost:5001/connect/token: 400 OK)
    //problem4 --> but Sign-out is not redirecting to logout page

    //Issue3: Use this code if dashboard route has DON'T HAVE canActivate: [AutoLoginGuard] 
    //problem5 --> but it is redirecting to the original page eg:- accesing securedetails but afer login redirecting to dashboard
    //problem6 --> but Sign-out is not redirecting to logout page

    this.authservice.IsAuthenticated$.subscribe(data =>{
      debugger;
      if(data == false){
        if ('/logout' == window.location.pathname) {
        }
        else{
          this.authservice.checkAuth().subscribe( result => {
            debugger;
            this.isAuthenticated = result;
            this.authservice.IsAuthenticated$;
          });
        }
      }
      else{
        this.isAuthenticated = data;        
      }
    }
    );
    */

  }
  
  private navigateToStoredEndpoint() {
    const path = this.read('redirect');
    console.log("** in navigateToStoredEndpoint, path=" + path);

    if (this.router.url === path) {
      return;
    }

    if (path.toString().includes('/unauthorized')) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate([path]);
    }
  }

  navigate(menuItem:any){
    //this.router.navigate([menuItem], {relativeTo: this.route});
    
    this.router.navigate(['../',menuItem],{relativeTo: this.route});
  }

  logout() {
    
    this.authservice.logoff();    
    
  }

  private read(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    return;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    
  }



}
