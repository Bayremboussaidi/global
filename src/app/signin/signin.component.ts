import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Adjust the path if necessary (use default import)
import { LoginService } from '../services/login.service'; // Adjust the path if necessary (use default import)

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        const response: any = await this.loginService.login(email, password);

        // Assuming the response contains user data in the expected format
        const userData = {
          role: response.role || 'ingenieur', // get user role from your backend response
          nom: response.nom,
          prenom: response.prenom,
          cin: response.cin
        };

        // Store user details in AuthService
        this.authService.setUserDetails(userData); // Call the method to set user data

        // Navigate to the dashboard after successful login
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Sign-in failed:', error);
        this.router.navigate(['/signin']);
        // Handle sign-in failure, e.g., display an error message to the user
      }
    }
  }
}