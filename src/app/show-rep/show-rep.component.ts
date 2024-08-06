import { Component, OnInit } from '@angular/core';
import { RepasService } from '../services/repas.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-repas',
  templateUrl: './show-rep.component.html',
  styleUrls: ['./show-rep.component.css']
})
export class ShowRepasComponent implements OnInit {
  repasList: any[] = [];
  displayedColumns: string[] = ['nom', 'prix', 'commentaire', 'cin'];
  displayRepas: boolean = false;
  newRepasForm: FormGroup;

  constructor(private repasService: RepasService, private fb: FormBuilder) {
    // Initialize the form with custom validators
    this.newRepasForm = this.fb.group({
      nom: ['', [Validators.required, this.existingNameValidator.bind(this)]],
      commentaire: ['', Validators.required],
      cin: [0, [Validators.required, Validators.min(1)]],
      prix: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Initially, the repas are not displayed
  }

  toggleRepas() {
    this.displayRepas = !this.displayRepas;

    if (this.displayRepas) {
      this.loadRepas();
    }
  }

  loadRepas() {
    this.repasService.getAllRepas().subscribe(
      (data: any[]) => {
        this.repasList = data;
      },
      (error) => {
        console.error('Error fetching repas', error);
      }
    );
  }

  // Custom validator to check if the meal name exists in repasList
  existingNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const existingNames = this.repasList.map(repas => repas.nom.toLowerCase());
    if (control.value && existingNames.includes(control.value.toLowerCase())) {
      return { nameExists: true };  // Return an error if the name already exists
    }
    return null;  // Return null if the name is valid
  }

  addRepas() {
    if (this.newRepasForm.valid) {
      const newRepas = this.newRepasForm.value;

      this.repasService.addRepas(newRepas.nom, newRepas.prix, newRepas.commentaire, newRepas.cin.toString()).subscribe(
        (data) => {
          this.repasList.push(data); // Assuming the service returns the new repas
          this.newRepasForm.reset();  // Reset the form for new input
        },
        (error) => {
          console.error('Error adding repas', error);
        }
      );
    }
  }
}