import { EmailContact } from "./email-contact";
import { PhoneContact } from "./phone-contact";

export class Person {
  id!: string | undefined;
  name!: string;
  lastName!: string;
  cpf!: string;

  emailContacts!: EmailContact[];
  phoneContacts!: PhoneContact[];
}
