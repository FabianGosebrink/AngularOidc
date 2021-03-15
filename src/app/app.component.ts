import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { TokenService } from 'src/services/token/token.service';

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

  constructor(private authservice:AuthService, private tokenservice: TokenService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("In App component ngOnInIt()");
    
    this.authservice.checkAuth().subscribe((isAuthenticated) => {

      this.authservice.IsAuthenticated$;
      
      console.log('app authenticated', isAuthenticated);
      const at = this.tokenservice.getToken();
      console.log(`Current access token is '${at}'`);
    });
    
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

  login() {
    this.authservice.login();
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
