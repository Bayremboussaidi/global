import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transport } from '../add-trans/add-trans.component';



@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private apiUrl = 'http://localhost:8084/api/transport'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Method to add a new transport
  add(transport: Transport): Observable<Transport> {
    return this.http.post<Transport>(this.apiUrl, transport);
  }

  // Method to get all transports
  getAll(): Observable<Transport[]> {
    return this.http.get<Transport[]>(this.apiUrl);
  }
}