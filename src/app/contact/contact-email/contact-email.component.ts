import { EmailContact } from './../../models/email-contact';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { EmailContactService } from 'src/app/services/email-contact.service';

@Component({
  selector: 'app-contact-email',
  templateUrl: './contact-email.component.html',
  styleUrls: ['./contact-email.component.css']
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
    private emailContactService: EmailContactService
  ) {}

  initForm(emailContact?: EmailContact) {
    this.form = this.formBuilder.group({
      id: [emailContact?.id],
      emailAddress: [emailContact?.emailAddress, Validators.required],
      personId: [emailContact?.personId]
    });
  }

  onAdd() {
    this.isForm = true;
    this.initForm();
  }

  onEdit(emailContact: EmailContact) {
    this.isForm = true;
    this.initForm(emailContact);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const emailContact: EmailContact = this.form.value;

      if (!emailContact.id) {

        this.Save(emailContact);
      } else {
        this.Update(emailContact);
      }
    }
  }

  Save(emailContact: EmailContact) {
    emailContact.personId = this.person.id;
    emailContact.emailAddress = emailContact.emailAddress.toLocaleLowerCase();

    this.emailContactService.Save(emailContact).subscribe((result) => {
      alert('E-mail adicionado com sucesso');
      this.onCancel();
    });
  }

  Update(emailContact: EmailContact) {
    emailContact.emailAddress = emailContact.emailAddress.toLocaleLowerCase();

    this.emailContactService.Update(emailContact).subscribe((result) => {
      alert('E-mail atualizado com sucesso');
      this.onCancel();
    });
  }

  onDelete(emailContact: EmailContact) {
    if (emailContact.id) {
      this.emailContactService.Delete(emailContact.id).subscribe(result => {
        alert('E-mail excluído com sucesso');
        this.onCancel();
      })
    };
  }

  onCancel() {
    this.submitted = false;
    this.isForm = false;
    this.onLoad.emit();
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
    }
  }
}
