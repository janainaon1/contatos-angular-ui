import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { PersonFormComponent } from './person/person-form/person-form.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: PersonComponent
  },
  {
    path: 'person/form',
    component: PersonFormComponent
  },
  {
    path: 'person/form/:id',
    component: PersonFormComponent
  },
  {
    path: 'person/:id/contacts',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
