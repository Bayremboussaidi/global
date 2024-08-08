import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string;

  constructor() {
    // This should be replaced with real authentication logic
    this.userRole = localStorage.getItem('userRole') || 'guest'; // Mock role, replace with actual logic
  }

  getUserRole(): string {
    return this.userRole;
  }

  // Other authentication methods such as login, logout, etc.
}