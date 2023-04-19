import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PhoneContact } from 'src/app/models/phone-contact';

@Component({
  selector: 'app-contact-phone',
  templateUrl: './contact-phone.component.html',
  styleUrls: ['./contact-phone.component.css']
})
export class ContactPhoneComponent {

  @Input() person!: Person;
  @Input() phoneContacts: PhoneContact[] = [];

  onDelete(person: Person) {
    console.log(person);
  }
}
