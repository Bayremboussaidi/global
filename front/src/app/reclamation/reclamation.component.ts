import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclamationService } from '../services/reclamation.service';

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

  constructor(private formBuilder: FormBuilder, private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadReclamations();
  }

  initializeForm() {
    this.reclamationForm = this.formBuilder.group({
      emailEnvoi: ['', [Validators.required, Validators.email]],
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

  onSubmit() {
    if (this.reclamationForm.valid) {
      const reclamationData = this.reclamationForm.value;
      this.reclamationService.addReclamation(reclamationData.emailEnvoi, reclamationData.texte).subscribe(
        (response) => {
          this.reclamationList.push(reclamationData); // Update the list with the new reclamation
          this.reclamationForm.reset();
          //this.showAddForm = false; // Hide the form after submission
        },
        (error) => {
          console.error('Error adding reclamation', error);
        }
      );
    }
  }
}
