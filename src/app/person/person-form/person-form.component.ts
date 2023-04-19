import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
})
export class PersonFormComponent implements OnInit {
  form!: FormGroup;
  title!: string;
  submitted = false;
  id!: string;
  person!: Person;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getPessoa(this.id);
        this.title = 'Atualizar pessoa';
        this.initForm();
      } else {
        this.title = 'Adicionar pessoa';
        this.initForm();
      }
    });
  }

  initForm(person?: Person) {
    this.form = this.formBuilder.group({
      id: [person?.id],
      name: [person?.name, Validators.required],
      lastName: [person?.lastName, Validators.required],
      cpf: [person?.cpf, Validators.required],
    });
  }

  getPessoa(id: string) {
    this.personService.GetById(id).subscribe((result) => {
      this.person = result;
      this.initForm(result);
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const person: Person = this.form.value;

      if (!person.id) {
        this.Save(person);
      } else {
        this.Update(person);
      }
    }
  }

  Save(person: Person) {
    this.personService.Save(person).subscribe((result) => {
      alert('Pessoa adicionada com sucesso');
      this.onCancel();
    });
  }

  Update(person: Person) {
    this.personService.Update(person).subscribe((result) => {
      alert('Pessoa atualizada com sucesso');
      this.onCancel();
    });
  }

  onCancel() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  hasError(field: string, type = 'required') {
    const errors = this.form.get(field)?.errors;
    if (errors) {
      return errors[type];
    }
    return null;
  }

  applyCssError(campo: string) {
    const field = this.form.get(campo);

    return {
      'is-invalid': !field?.valid && (this.submitted || field?.touched),
       'is-valid': field?.valid,
    }
  }
}
