import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secureddetails',
  templateUrl: './secureddetails.component.html',
  styleUrls: ['./secureddetails.component.css']
})
export class SecureddetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("In secured page ngOnInIt()");
  }

}
