import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmailContact } from '../models/email-contact';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmailContactService {

  private readonly BASE_URL = `${environment.BASE_URL}/email-contact`;

  constructor(private http: HttpClient) {}

  GetAll(): Observable<EmailContact[]> {
    return this.http.get<EmailContact[]>(this.BASE_URL);
  }

  GetById(id: string): Observable<EmailContact> {
    const apiUrl = `${this.BASE_URL}/${id}`;
    return this.http.get<EmailContact>(apiUrl);
  }

  Save(emailContact: EmailContact): Observable<any> {
    return this.http.post<EmailContact>(
      this.BASE_URL,
      emailContact,
      httpOptions
    );
  }

  Update(emailContact: EmailContact): Observable<any> {
    return this.http.put<EmailContact>(
      this.BASE_URL,
      emailContact,
      httpOptions
    );
  }

  Delete(id: string): Observable<any> {
    const apiUrl = `${this.BASE_URL}/${id}`;
    return this.http.delete(apiUrl, httpOptions);
  }
}
