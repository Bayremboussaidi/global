import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepasService {
  private apiUrl = 'http://localhost:8084/repas'; // Define the API URL here

  constructor(private http: HttpClient) {}

  addRepas(nom: string, prix: number, commentaire: string, cin: string): Observable<any> {
    const body = { nom, prix, commentaire, cin };
    return this.http.post(this.apiUrl, body);
  }

  getAllRepas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
