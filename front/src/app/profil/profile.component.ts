import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profilePicUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService , private router : Router) {
    this.profileForm = this.fb.group({
      nom: [''],
      prenom: [''],
      sexe: [''],
      tel: [''],
      email: [''],
      poste: [''],
      password: [''],
      profilePic: [null]
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  goToCentralPage() {
    this.router.navigate(['/dashboard']);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          this.profilePicUrl = result;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // Additional submission logic
    }
  }
}
