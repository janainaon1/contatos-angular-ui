import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Person } from 'src/app/models/person';
import { EmailContact } from 'src/app/models/email-contact';
import { EmailContactService } from 'src/app/services/email-contact.service';

@Component({
  selector: 'app-contact-email',
  templateUrl: './contact-email.component.html',
  styleUrls: ['./contact-email.component.css'],
})
export class ContactEmailComponent {
  @Input() person!: Person;
  @Input() emailContacts: EmailContact[] = [];

  @Output() onLoad = new EventEmitter();
  isForm: boolean = false;
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: EmailContactService,
    private toastService: ToastrService
  ) {}

  initForm(contact?: EmailContact) {
    this.form = this.formBuilder.group({
      id: [contact?.id],
      emailAddress: [
        contact?.emailAddress,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
          Validators.email,
        ]),
      ],
      personId: [contact?.personId],
    });
  }

  onAdd() {
    this.isForm = true;
    this.initForm();
  }

  onEdit(contact: EmailContact) {
    this.isForm = true;
    this.initForm(contact);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const contact: EmailContact = this.form.value;

      if (!contact.id) {
        this.Save(contact);
      } else {
        this.Update(contact);
      }
    }
  }

  Save(contact: EmailContact) {
    contact.personId = this.person.id;

    this.contactService.Save(contact).subscribe({
      next: () => {
        this.toastService.success('E-mail adicionado!', 'Sucesso');
        this.onReset();
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error(
          'Tente novamente mais tarde.',
          'Erro inesperado'
        );
        console.error(error);
      },
    });
  }

  Update(contact: EmailContact) {
    this.contactService.Update(contact).subscribe({
      next: () => {
        this.toastService.success('E-mail atualizado!', 'Sucesso');
        this.onReset();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.toastService.error('Contato não localizado.', 'Atenção!');
        } else {
          this.toastService.error(
            'Tente novamente mais tarde.',
            'Erro inesperado'
          );
        }
        console.error(error);
      },
    });
  }

  onDelete(contact: EmailContact) {
    if (contact.id) {
      this.contactService.Delete(contact.id).subscribe({
        next: () => {
          this.toastService.success('E-mail excluído!', 'Sucesso');
          this.onReset();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.toastService.error('Contato não localizado.', 'Atenção!');
          } else {
            this.toastService.error(
              'Tente novamente mais tarde.',
              'Erro inesperado'
            );
          }
          console.error(error);
        },
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.isForm = false;
    this.onLoad.emit();
  }

  onCancel() {
    this.toastService.warning('As alterações não foram salvas.', 'Atenção');
    this.onReset();
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
      //  'is-valid': field?.valid,
    };
  }
}
