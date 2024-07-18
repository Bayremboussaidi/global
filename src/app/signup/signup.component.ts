import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/auth/authentication.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private service: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onInitSignUpForm();
  }

  onInitSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      secondName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      bio: [''],
      hobbies: ['']
    });
  }

  onSubmitSignUpForm() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      // Use the service to sign up the user
      // this.service.signUp(this.signUpForm.value).subscribe(response => {
      //   // Handle success
      //   console.log('Signup successful', response);
      // }, error => {
      //   // Handle error
      //   console.error('Signup error', error);
      // });
    }
  }
}
