import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { PersonService } from '../services/person.service';
import { Person } from '../models/person';
import { EmailContact } from '../models/email-contact';
import { PhoneContact } from '../models/phone-contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  title = "Lista de contatos";
  @ViewChild('listTabs') listTabs!: TabsetComponent;
  id!: string;
  person!: Person;
  emailContacts: EmailContact[] = [];
  phoneContacts: PhoneContact[] = [];

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getPessoa(this.id);
      }
    });
  }

  getPessoa(id: string) {
    this.personService.GetById(id).subscribe((result) => {
      this.person = result;
      this.emailContacts = this.person.emailContacts;
      this.phoneContacts = this.person.phoneContacts;
    });
  }

  onDelete(person: Person) {
    console.log(person);
  }
}
