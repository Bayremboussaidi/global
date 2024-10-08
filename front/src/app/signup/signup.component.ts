import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private register: RegistrationService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      poste: ['ingenieur', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(6)]] , 
      cin: ['00', Validators.required], 

    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      const { nom, prenom, sexe, tel, email, poste, password ,cin} = this.signupForm.value;

      
      this.register.register({ nom, prenom, sexe, tel, email, poste, password , cin }).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
