import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
// import { HttpParams } from  "@angular/common/http";

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     'Access-Control-Allow-Credentials':"Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   })
// };

const headers = new HttpHeaders().set(
  "Content-type",
  "application/json; charset=UTF-8"
);

@Injectable({
  providedIn: 'root'
})
export class APIService {
  API_URL  =  'http://localhost:3000';

  
  constructor(private  httpClient:  HttpClient) { }
  
  getContacts(){
    // const  params = new  HttpParams({fromString:  'firstName=Pang'});
    // return  this.httpClient.get(`${this.API_URL}/stickies`, {params});
    return  this.httpClient.get(`${this.API_URL}/stickies`);
  }

  createContact(contact){
    return  this.httpClient.post(`${this.API_URL}/stickies/`,contact, { headers });
  }

  searchContact(){
    return  this.httpClient.request
  }
}
