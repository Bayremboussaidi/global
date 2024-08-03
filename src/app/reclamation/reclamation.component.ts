import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclamationService } from '../services/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamationForm!: FormGroup; // Ensure that reclamationForm is initialized

  reclamationList: any[] = []; // Replace with your data model
  displayedColumns: string[] = ['emailEnvoi', 'texte']; // Replace with your column names
  showAddForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.initializeForm();
    
  }

  initializeForm() {
    this.reclamationForm = this.formBuilder.group({
      emailEnvoi: ['bayremboussaidi187@gmail.com', [Validators.required, Validators.email]],
      texte: ['', Validators.required]
    });
  }



  onSubmit() {
    if (this.reclamationForm.valid) {
      const reclamationData = this.reclamationForm.value;
      this.reclamationService.addReclamation(reclamationData.emailEnvoi, reclamationData.texte).subscribe(
        (response) => {
          this.reclamationList.push(reclamationData); // Update the list with the new reclamation
          this.reclamationForm.reset();
          this.showAddForm = false; // Hide the form after submission
        },
        (error) => {
          console.error('Error adding reclamation', error);
        }
      );
    }
} }
