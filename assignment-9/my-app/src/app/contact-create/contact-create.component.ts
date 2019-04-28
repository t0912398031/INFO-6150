import { Component, OnInit } from  '@angular/core';
import { APIService } from  '../rest.service';


@Component({
selector:  'app-contact-create',
templateUrl:  './contact-create.component.html',
styleUrls: ['./contact-create.component.css']
})

export  class  ContactCreateComponent  implements  OnInit {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
constructor(private  apiService:  APIService) { }

ngOnInit() {}

processForm() {
  // const allInfo = `My name is ${this.firstName}. My email is ${this.email}. My phone is ${this.phoneNumber}`;
  // alert(allInfo); 

  var  contact  = {
    "email":  this.email,
    "firstName":  this.firstName,
    "lastName": this.lastName,
    "phoneNumber": this.phoneNumber
  };

  var letter = /^[a-zA-Z]+$/;
  var number = /^[0-9]+$/;
  if(!contact.phoneNumber.match(number)) {
    alert('please check your input');
    return;
  };
  if(!contact.firstName.match(letter)||!contact.lastName.match(letter)) {
    alert('please check your input');
    return;
  };


  this.apiService.createContact(contact).subscribe(
    // (response) => {
    //   console.log(response);
    // }

    data => { 
      console.log("POST Request is successful ", data); 
      alert('create successfully'); 
      }, 
      error => { 
      console.log("Error", error); 
      } 
  );

  
}

}
