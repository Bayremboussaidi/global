import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8084/api/reclamation';

  constructor(private http: HttpClient , private authService: AuthService) {}

  // Method to add a new reclamation
  addReclamation(email: string, texte: string): Observable<any> {
    const body = { email, reclam: texte };
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Use Bearer token
    });
    return this.http.post(this.apiUrl, body);
  }

  
  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
