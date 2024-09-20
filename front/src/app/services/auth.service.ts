import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


interface User {
  nom: string;
  prenom: string;
  sexe: string; 
  tel: string;  
  email: string; 
  poste: string; 
  cin: string;   
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token'); 
  }
  private user: User | null = null;

  private apiUrl = 'http://localhost:8084/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login`, {
    email,
    password,
  }).pipe(
    tap((response) => {
      if (response && response.token) {
        this.setUserDetails(response.user); 
      }
    })
  );
 }
  setUserDetails(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user)); 
  }

  getUserDetails(): User | null {
    return this.user || JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return this.user !== null ;
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user'); // Clear user details from local storage fle5er
  }
}