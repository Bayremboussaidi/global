import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'http://localhost:8084/signup'; 

  constructor(private http: HttpClient) { }

  register(userData: {
    nom: string;
    prenom: string;
    sexe: string;
    tel: number;
    email: string;
    poste: string;
    password: string;
    cin: number;
  }): Observable<any> {
    const url = `${this.apiUrl}`; 

    return this.http.post<any>(url, userData).pipe(
      catchError(this.handleError<any>('signup'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
