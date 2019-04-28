import { Component, OnInit } from '@angular/core';
import { APIService } from  '../rest.service';

import { Observable } from  "rxjs";
import { HttpClient } from  "@angular/common/http";

// class  Contacts {
//   firstName : string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
// }

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  private  contacts:  Array<object> = [];
  // contactsObservable : Observable<Contacts[]>;

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

}
