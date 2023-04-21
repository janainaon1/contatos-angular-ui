import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonService } from './services/person.service';
import { PersonComponent } from './person/person.component';
import { PersonFormComponent } from './person/person-form/person-form.component';
import { ContactEmailComponent } from './contact/contact-email/contact-email.component';
import { ContactPhoneComponent } from './contact/contact-phone/contact-phone.component';
import { EmailContactService } from './services/email-contact.service';
import { icons } from './shared/icons';
import { LogoComponent } from './components/logo/logo.component';
import { FormFooterOptionsComponent } from './components/form-footer-options/form-footer-options.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    PersonComponent,
    PersonFormComponent,
    ContactEmailComponent,
    ContactPhoneComponent,
    LogoComponent,
    FormFooterOptionsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxBootstrapIconsModule.pick(icons),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 3000
    })
  ],
  providers: [
    HttpClientModule,
    PersonService,
    provideNgxMask(),
    EmailContactService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
