import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8084/reclamation'; // Define the API URL here

  constructor(private http: HttpClient) {}

  // Method to add a new reclamation
  addReclamation(email: string, texte: string): Observable<any> {
    const body = { email, reclam: texte };
    return this.http.post(this.apiUrl, body);
  }

  // Method to get all reclamations
  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
