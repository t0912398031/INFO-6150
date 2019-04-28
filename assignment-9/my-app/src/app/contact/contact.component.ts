import { Component, OnInit } from '@angular/core';
import { APIService } from  '../rest.service';

import { Observable } from  "rxjs";
import { HttpClient } from  "@angular/common/http";

class  Contact {
  firstName : string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private  contacts:  Array<object> = [];
  private  d:  object;
  // contactsObservable : Observable<Contacts[]>;
  show: boolean = false;
  show2: boolean = true;

  constructor(private  apiService:  APIService, private httpClient: HttpClient) { }

  ngOnInit() {
      this.getContacts();
      // this.contactsObservable = this.httpClient
      // .get<Contacts[]>("http://localhost:3000/stickies")
      // // .do(console.log);
  }
  public  getContacts(){
    this.apiService.getContacts().subscribe((data:  Array<object>) => {
        this.contacts  =  data;
        console.log(data);
    });
  }

  detail(contact: Contact): void{
    console.log(contact);
    this.show=true;
    this.show2=false;
    this.d = contact;
  }

  back(){
    this.show=false;
    this.show2=true;
  }

}
