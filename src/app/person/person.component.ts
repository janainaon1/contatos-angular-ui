import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private personService: PersonService,
    private toastService: ToastrService
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
      this.personService.Delete(person.id).subscribe({
        next: () => {
          this.toastService.success('Pessoa excluída!', 'Sucesso');
          this.onLoad();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 404) {
              this.toastService.error('Pessoa não localizada.', 'Atenção!');
          }
          else {
            this.toastService.error(
              'Tente novamente mais tarde.', 'Erro inesperado'
            );
          }
          console.error(error);
        }
      })
    }
  }
}
