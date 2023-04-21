import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PhoneContact } from '../models/phone-contact';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhoneContactService {
  private readonly BASE_URL = `${environment.BASE_URL}/phone-contact`;

  constructor(private http: HttpClient) {}

  GetAll(): Observable<PhoneContact[]> {
    return this.http.get<PhoneContact[]>(this.BASE_URL);
  }

  GetById(id: string): Observable<PhoneContact> {
    const apiUrl = `${this.BASE_URL}/${id}`;
    return this.http.get<PhoneContact>(apiUrl);
  }

  Save(contact: PhoneContact): Observable<any> {
    return this.http.post<PhoneContact>(this.BASE_URL, contact, httpOptions);
  }

  Update(contact: PhoneContact): Observable<any> {
    return this.http.put<PhoneContact>(this.BASE_URL, contact, httpOptions);
  }

  Delete(id: string): Observable<any> {
    const apiUrl = `${this.BASE_URL}/${id}`;
    return this.http.delete(apiUrl, httpOptions);
  }
}
