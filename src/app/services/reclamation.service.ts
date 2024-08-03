import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8084/reclamation'; // Define the API URL here

  constructor(private http: HttpClient) {}

  addReclamation(email: string, texte: string): Observable<any> {
    const body = { email, reclam: texte };
    return this.http.post(this.apiUrl, body);
  }
}