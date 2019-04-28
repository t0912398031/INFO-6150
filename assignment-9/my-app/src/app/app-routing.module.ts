import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path:  '', redirectTo:  'contact', pathMatch:  'full' },
{
    path:  'contacts',
    component:  ContactListComponent
},
{
    path:  'create-contact',
    component:  ContactCreateComponent
},
{
    path:  'contact',
    component:  ContactComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }