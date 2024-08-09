// LoginService.js
import {AuthService} from '../services/auth.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes this service available throughout the application
})

export class LoginService {
    async login(email : string, password : string) {
        try {
            const userData = await AuthService.signin(email, password);
            // You can save the token and user data to local storage or state management
            localStorage.setItem('user', JSON.stringify(userData)); // Example of storing user data
            return userData;
        } catch (error) {
            throw error; // Propagate the error to the component
        }
    }
}

