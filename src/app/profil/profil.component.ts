import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profileForm!: FormGroup;
  profilePicUrl: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      nom: ['Doe', Validators.required],
      prenom: ['John', Validators.required],
      tel: ['1234567890', Validators.required],
      email: ['bayremboussaidi187@gmail.com', [Validators.required, Validators.email]],
      role: ['ingenieur', Validators.required],
      password: ['', Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicUrl = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
