import { Component, Input } from '@angular/core';
import { EmailContact } from 'src/app/models/email-contact';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-contact-email',
  templateUrl: './contact-email.component.html',
  styleUrls: ['./contact-email.component.css']
})
export class ContactEmailComponent {

  @Input() person!: Person;
  @Input() emailContacts: EmailContact[] = [];

  onDelete(person: Person) {
    console.log(person);
  }
}
