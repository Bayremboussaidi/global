import { Injectable } from '@angular/core';

interface User {
  role: string;
  nom: string;
  prenom: string;
  cin: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  constructor() {}

  setUserDetails(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user)); // Save user data to local storage
  }

  getUserDetails(): User | null {
    return this.user || JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user'); // Clear user details from local storage
  }
}