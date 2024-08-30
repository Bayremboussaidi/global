import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

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

        // Log the response from the login service
        console.log(response);

        const userData = {
          poste: response.poste, 
          nom: response.nom,
          prenom: response.prenom,
          tel: response.tel,
          email: response.email,
          cin: response.cin 
        };

        console.log('User Poste:', userData.poste); 

        
        this.loginService.setUserDetails(userData);

        
        if (userData.poste === 'admin') {
          console.log('Redirecting to admin dashboard');
          this.router.navigate(['/dash-admin']);
        } else {
          console.log('Redirecting to user dashboard');
          this.router.navigate(['/dashboard']);
        }
      } catch (error: any) {
        console.error('Sign-in failed:', error);
        alert('Login failed: ' + error.message);
        this.router.navigate(['/signin']);
      }
    }
  }
}