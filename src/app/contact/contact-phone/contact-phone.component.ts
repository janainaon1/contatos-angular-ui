import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Person } from 'src/app/models/person';
import { PhoneContact } from 'src/app/models/phone-contact';
import { PhoneContactService } from 'src/app/services/phone-contact.service';

@Component({
  selector: 'app-contact-phone',
  templateUrl: './contact-phone.component.html',
  styleUrls: ['./contact-phone.component.css'],
})
export class ContactPhoneComponent {
  @Input() person!: Person;
  @Input() phoneContacts: PhoneContact[] = [];

  @Output() onLoad = new EventEmitter();
  isForm: boolean = false;
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: PhoneContactService,
    private toastService: ToastrService
  ) {}

  initForm(contact?: PhoneContact) {
    this.form = this.formBuilder.group({
      id: [contact?.id],
      phoneNumber: [
        contact?.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ]),
      ],
      isWhatsapp: [contact?.isWhatsapp ?? true],
      personId: [contact?.personId],
    });
  }

  onAdd() {
    this.isForm = true;
    this.initForm();
  }

  onEdit(contact: PhoneContact) {
    this.isForm = true;
    this.initForm(contact);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const contact: PhoneContact = this.form.value;

      if (!contact.id) {
        this.Save(contact);
      } else {
        this.Update(contact);
      }
    }
  }

  Save(contact: PhoneContact) {
    contact.personId = this.person.id;

    this.contactService.Save(contact).subscribe({
      next: () => {
        this.toastService.success('Telefone adicionado!', 'Sucesso');
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

  Update(contact: PhoneContact) {
    this.contactService.Update(contact).subscribe({
      next: () => {
        this.toastService.success('Telefone atualizado!', 'Sucesso');
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

  onDelete(contact: PhoneContact) {
    if (contact.id) {
      this.contactService.Delete(contact.id).subscribe({
        next: () => {
          this.toastService.success('Telefone excluído!', 'Sucesso');
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
