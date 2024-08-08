import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  logout() {
    //localStorage.removeItem('userToken');
    //console.log('User logged out');

    this.router.navigate(['/signin']);
  }
  private apiUrl = 'http://localhost:8084/signin'; 

  constructor(private http: HttpClient , private router: Router) {}

  async authenticate(email: string, password: string) {
    const payload = { email, password };

    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/login`, payload, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe({
          next: (response: any) => {
            if (response.success) {
              resolve(response);
            } else {
              reject(response.message);
            }
          },
          error: (err) => {
            reject('Request failed: ' + err.message);
          }
        });
    });
  }
}