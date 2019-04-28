import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, } from "@angular/common/http";
// import { main1 } from '../main.js';


class Contact {
  firstName : number;
  lastName: string;
  email: string;
  phoneNumber: string;
  }    

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Assignment 9';
  customersObservable : Observable<Contact[]>; 
  constructor(private httpClient:HttpClient) {
  }
  ngOnInit() {
  this.customersObservable = this.httpClient
      .get<Contact[]>("http://localhost:3000/stickies");
  }
  
}

