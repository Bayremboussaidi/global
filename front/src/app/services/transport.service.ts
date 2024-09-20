import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transport } from '../add-trans/add-trans.component';



@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private apiUrl = 'http://localhost:8084/api/transport'; 

  constructor(private http: HttpClient) { }

  add(transport: Transport): Observable<Transport> {
    return this.http.post<Transport>(this.apiUrl, transport);
  }


  getAll(): Observable<Transport[]> {
    return this.http.get<Transport[]>(this.apiUrl);
  }
}