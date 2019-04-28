import './../scss/main.scss';


//  Add
 var form  = document.getElementById('contact');
 form.addEventListener('submit', function(){

    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3000/stickies";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            console.log("add successfully" + json.responseText)
        }
    }
    // let data = JSON.stringify({"firstName":"Man","lastName":"Spider","phoneNumber":"1234567890","email":"Spider@spider.com"});
    let data = JSON.stringify({"firstName":form.firstName.value,"lastName":form.lastName.value,"phoneNumber":form.phoneNumber.value,"email":form.email.value});
    xhr.send(data);
    // console.log(form.firstName);


  //   if(!window.contactList){ //check if we already have a contact list
  //   window.contactList=$ab(form.person.value,form.phone.value,form.email.value);
  //  } else {
  //  //saves new values rather than deleting old ones as well
  //    contactList.addNewContact(form.person.value,form.phone.value,form.email.value);
  //  }
   
  //    form.person.value = '';
  //    form.phone.value = '';
  //    form.email.value = '';
   
  //   event.preventDefault();
 });
 
// Search
 var searchForm = document.getElementById('search');
 searchForm.addEventListener('submit', function(){
   var results;
   if(results !== undefined){
     results = null;
   }
   if(!window.contactList){
     window.contactList = $ab();
   }else{
     results = contactList.search(searchForm.search.value);
   }
   document.getElementById('results').innerHTML = '';
   if(results.length>0){
     
     for(var i = 0;i<results.length;i++){
       document.getElementById('results').innerHTML += '<div class="contact-item">Name:'+results[i].name+'<br>Phone:'+results[i].phone+'<br>Email:'+results[i].email+'</div><hr>';
     }
   } else{
    document.getElementById('results').innerHTML += '<div class="contact-item">There are no results for this name</div><hr>';
   }
   
   //do something with the results
   event.preventDefault();
 });
 
//  Show
 document.getElementById('js-show-all').addEventListener('click', function(){

  var container = document.getElementById('show-panel');
  container.innerHTML = '';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
          //  alert();

          let obj = JSON.parse(this.responseText);
        //   console.log(obj.length); 
          console.log(obj);
          if(obj.length==0){
            container.innerHTML += '<div class="contact-item">You have no contacts. Why not add  a few?</div><hr>';
          } else{
            obj.forEach(function(object){
                
              // console.log(object); 
              // console.log(object.firstName);
            //   container.innerHTML += '<div class="contact-item">First Name:'+object.firstName+'<br>Last Name:'+object.lastName+'<br>Phone Number:'+object.phoneNumber+'<br>Email:'+object.email+'</div><hr>';
              
              document.getElementById('show-panel').innerHTML += '<div>'+object.firstName+' '+object.lastName+'</div><br>';
              document.getElementById('show-panel').innerHTML += '<button>Detail</button><hr>';
              
              var allButtonsOnPage = document.querySelectorAll('button');
              allButtonsOnPage.forEach(function(button, index) {
                button.addEventListener('click', function() {
                    container.innerHTML = '';
                  
                //   console.log(obj[index]);
                  container.innerHTML += '<div class="contact-item">First Name:'+obj[index].firstName+'<br>Last Name:'+obj[index].lastName+'<br>Phone Number:'+obj[index].phoneNumber+'<br>Email:'+obj[index].email+'</div><hr>';
                });
              });


            // function myFunction(o) {
            //     var el = document.createElement("div"),
            //         button = document.createElement("button");
            
            //     button.innerHTML = 'Detail';
            //     // button.onclick = function( e ) {
            //     //     listener(e, o);
            //     // }
            //     button.onclick = function() {
            //         container.innerHTML += o.phoneNumber + o.email;
            //     }
                    
            //     el.appendChild(button);
            //     container.appendChild(el);

            // }
            
            // myFunction(object);
              
            });
          }
           
       }
  };
  xhttp.open("GET", "http://localhost:3000/stickies", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send("");

  // console.log(obj.firstName);
  // console.log(obj.lastName);
  // console.log(obj.phoneNumber);
  // console.log(obj.email);

   document.getElementById('show-panel').style.display = 'block';
   document.getElementById('search-panel').style.display = 'none';
   document.getElementById('contact-panel').style.display = 'none';
 });
 
 document.getElementById('js-search').addEventListener('click', function(){
   document.getElementById('show-panel').style.display = 'none';
   document.getElementById('search-panel').style.display = 'block';
   document.getElementById('contact-panel').style.display = 'none';
 });
 
 document.getElementById('js-add-new').addEventListener('click', function(){
   document.getElementById('show-panel').style.display = 'none';
   document.getElementById('search-panel').style.display = 'none';
   document.getElementById('contact-panel').style.display = 'block';
 });



// import aImage from '../src/images/A.jpg';

// var aImg = document.getElementById('A');
// aImg.src = aImage;