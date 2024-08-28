import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface User {
  id?: number;      
  nom: string;   
  prenom: string;  
  sexe: 'Masculin' | 'Féminin' | 'Autre'; 
  tel: string;     
  email: string;   // Email address
  poste: string;   // Job title/position
  cin: string;     // National identity card number
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8084/api/users'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}