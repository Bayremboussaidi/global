import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject = new BehaviorSubject<any>(null); // Store user data
  public user$ = this.userSubject.asObservable(); // Observable for user data

  constructor(private http: HttpClient) {}

  // Method for logging in
  login(email: string, password: string): Promise<any> {
    return this.http.post<any>('http://localhost:8084/signin', { email, password }).toPromise()
      .then(response => {
        // You might need to adjust based on the actual API response structure
        if (response.user) {
          // Assuming response contains user data
          this.setUserDetails(response.user);
        }
        return response; // Return the response for further processing
      })
      .catch(error => {
        // Handle the error appropriately
        console.error('Login error:', error);
        throw new Error(error.error.message || 'Login failed');
      });
  }

  // Method to set user details in service
  setUserDetails(user: any): void {
    this.userSubject.next(user); // Update user observable
    localStorage.setItem('user', JSON.stringify(user)); // Optionally save to localStorage
  }

  // Method to get user details
  getUserDetails(): any {
    return this.userSubject.value || JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Method to log out
  logout(): void {
    this.userSubject.next(null); // Clear user data
    localStorage.removeItem('user'); // Clear from localStorage
  }
}