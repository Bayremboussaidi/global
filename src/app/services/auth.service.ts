// AuthService.js
import axios from 'axios';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // This makes it available throughout the app
})

export class AuthService {

  static apiUrl: string;
   apiUrl = 'http://localhost:8084/signin'; // Replace with your actual API URL
    constructor( private router : Router) { }

    static async signin(email: string, password: string) {
      try {
        const response =  axios.post(this.apiUrl, {
            email,
            password
        });
        return (await response).data; // Success, return user data and token
    } catch (error :any) {
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

