// LoginService.js
import axios from 'axios';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // Makes this service available throughout the application
})
export class LoginService {
  private apiUrl: string = 'http://localhost:8084/signin'; // Replace with your actual API URL

  constructor(private router: Router) {}

  async login(email: string, password: string) {
    try {
      const userData = await this.signin(email, password);
      this.setUserDetails(userData); // Save the user data in local storage
      return userData;
    } catch (error) {
      throw error; // Propagate the error to the component
    }
  }

  private async signin(email: string, password: string) {
    try {
      const response = await axios.post(this.apiUrl, { email, password });
      return response.data; // Success, return user data and token
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data || 'Login failed');
      } else {
        throw new Error('Server error');
      }
    }
  }

   setUserDetails(userData: any): void {
    // Store user data as a JSON string
    localStorage.setItem('user', JSON.stringify(userData));
  }

  logout(): void {
    localStorage.removeItem('user'); // Clear user data from local storage
    this.router.navigate(['/signin']); // Redirect to login page
  }
}