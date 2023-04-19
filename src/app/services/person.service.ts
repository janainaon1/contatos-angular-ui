import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  url = 'https://localhost:7267/api/person';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  GetById(id: string): Observable<Person> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Person>(apiUrl);
  }

  Save(person: Person): Observable<any> {
    return this.http.post<Person>(this.url, person, httpOptions)
  }

  Update(person: Person): Observable<any> {
    return this.http.put<Person>(this.url, person, httpOptions)
  }

  Delete(id: string): Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete(apiUrl, httpOptions);
  }
}
