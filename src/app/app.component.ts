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
    
    // this.authservice.userData$.subscribe( data => {
    //   console.log("userdata ==>",data);
    // })

    
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

  }
    
  navigate(menuItem:any){
    //this.router.navigate([menuItem], {relativeTo: this.route});
    
    this.router.navigate(['../',menuItem],{relativeTo: this.route});
  }

  logout() {
    
    this.authservice.logoff();    
    
  }
}
