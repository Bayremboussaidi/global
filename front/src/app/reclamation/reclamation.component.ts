import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclamationService } from '../services/reclamation.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamationForm!: FormGroup;
  reclamationList: any[] = [];
  displayedColumns: string[] = ['emailEnvoi', 'texte'];
  showAddForm: boolean = true;

  userEmail: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private reclamationService: ReclamationService,
    private authService: AuthService,  
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getUserEmail(); // Fetch user email on initialization
    this.loadReclamations();
  }

  goToCentralPage() {
    this.router.navigate(['/dashboard']);
  }

  initializeForm() {
    // Disable the email field by default
    this.reclamationForm = this.formBuilder.group({
      emailEnvoi: [{ value: '', disabled: true }, [Validators.required, Validators.email]], 
      texte: ['', Validators.required]
    });
  }

  loadReclamations() {
    this.reclamationService.getAllReclamations().subscribe(
      (data: any[]) => {
        this.reclamationList = data;
      },
      (error) => {
        console.error('Error fetching reclamations', error);
      }
    );
  }

  getUserEmail() {
    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.userEmail = userDetails.email; // Extract the email
      // Patch the email to the form and make it disabled
      this.reclamationForm.patchValue({ emailEnvoi: this.userEmail });
    }
  }

  onSubmit() {
    if (this.reclamationForm.valid) {
      const reclamationData = this.reclamationForm.value;
      // Add a reclamation using the ReclamationService
      this.reclamationService.addReclamation(reclamationData.emailEnvoi, reclamationData.texte).subscribe(
        (response) => {
          this.reclamationList.push(reclamationData); // Update the list with the new reclamation
          this.reclamationForm.reset();
        },
        (error) => {
          console.error('Error adding reclamation', error);
        }
      );
    }
  }
}
