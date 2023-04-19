import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly BASE_URL = `${environment.BASE_URL}/person`;

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.BASE_URL);
  }

  GetById(id: string): Observable<Person> {
    const apiUrl = `${this.BASE_URL}/${id}`;
    return this.http.get<Person>(apiUrl);
  }

  Save(person: Person): Observable<any> {
    return this.http.post<Person>(this.BASE_URL, person, httpOptions)
  }

  Update(person: Person): Observable<any> {
    return this.http.put<Person>(this.BASE_URL, person, httpOptions)
  }

  Delete(id: string): Observable<any> {
    const apiUrl = `${this.BASE_URL}/${id}`;
    return this.http.delete(apiUrl, httpOptions);
  }
}
