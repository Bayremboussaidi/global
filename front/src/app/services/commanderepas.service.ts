
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service'; // Import the LoginService

export interface RepasCommand {
    nomR: string;   // Name of the meal
    
    commentaire: string;     // Comments regarding the meal
    cin: string;             // Identifier (ex: customer ID)
    quantity: number;        // Quantity of meals
    id?: number;            // Optional ID, usually generated by the server
}

@Injectable({
    providedIn: 'root'
})
export class CommanderepasService {

    private apiUrl = 'http://localhost:8084/api/commanderepas'; 

    constructor(private http: HttpClient, private loginService: LoginService) { }

    // Method to add a new repas command
    addRepasCommand(command: RepasCommand): Observable<RepasCommand> {
        const token = this.loginService.getToken(); // Retrieve the token

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include token in headers
        });

        return this.http.post<RepasCommand>(this.apiUrl, command, { headers }).pipe(
            catchError(this.handleError<RepasCommand>('addRepasCommand'))
        );
    }

    // Method to get all repas commands
    getAllRepasCommands(): Observable<RepasCommand[]> {
        const token = this.loginService.getToken(); // Retrieve the token

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` // Include token in headers
        });

        return this.http.get<RepasCommand[]>(this.apiUrl, { headers }).pipe(
            catchError(this.handleError<RepasCommand[]>('getAllRepasCommands', []))
        );
    }

    // Error handling method
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`); // Log to console
            return of(result as T); // Let the app keep running by returning an empty result
        };
    }
}