import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface TransCommand {
    [x: string]: any;
    id: number;
    chemin: string;
    departure: string;
    arrivee: string;
    commentaire : string;
    // Include additional properties as per actual data structure
}

@Injectable({
  providedIn: 'root'
})
export class CommandetransService {



    private apiUrl = 'http://localhost:8084/commandetrans'; // Your API URL

    constructor(private http: HttpClient) { }

    // Method to add a new transport command
    addCommandeTrans(commande: TransCommand): Observable<any> {
        return this.http.post(this.apiUrl, commande, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    // Method to get all transport commands
    getAllCommandesTrans(): Observable<TransCommand[]> {
        return this.http.get<TransCommand[]>(this.apiUrl);
    }
}

