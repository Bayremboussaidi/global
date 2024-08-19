import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Repas {
  nom: string; // Make sure this matches your data model
 
  prix: number;
}



@Injectable({
  providedIn: 'root'
})
export class RepasService {
  private apiUrl = 'http://localhost:8084/repas';  // Get the API URL from environment variable

  constructor(private http: HttpClient) {}

  addRepas(repas: Repas): Observable<Repas> {
    return this.http.post<Repas>(this.apiUrl, repas);
  }

  getAllRepas(): Observable<Repas[]> {
    return this.http.get<Repas[]>(this.apiUrl);
  }
}