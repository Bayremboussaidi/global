import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface User {
  id?: number;      // Unique identifier for each user
  nom: string;     // Last name
  prenom: string;  // First name
  sexe: 'Masculin' | 'Féminin' | 'Autre'; // Gender
  tel: string;     // Phone number
  email: string;   // Email address
  poste: string;   // Job title/position
  cin: string;     // National identity card number
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8084/users'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}