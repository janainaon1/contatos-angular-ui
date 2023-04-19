import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  title = "Lista de Pessoas";
  personList: Person[] = [];

  constructor(
    private personService: PersonService
    ) {}

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.personService.GetAll().subscribe(result => {
      this.personList = result;
    });
  }

  onDelete(person: Person) {
    if (person.id) {
      this.personService.Delete(person.id).subscribe(result => {
        alert("Pessoa excluída com sucesso");
        this.onLoad();
      })
    }
  }
}
