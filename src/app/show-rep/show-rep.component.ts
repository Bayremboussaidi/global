import { Component, OnInit } from '@angular/core';
import { RepasService } from '../services/repas.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommanderepasService } from '../services/commanderepas.service';



// Define the RepasCommand interface within the same file
 interface RepasCommand {
  nom: string; // This is required
  commentaire: string; 
  cin: string; 
  quantity: number; 
  prix?: number; // Optional property example
}
  


@Component({
  selector: 'app-show-repas',
  templateUrl: './show-rep.component.html',
  styleUrls: ['./show-rep.component.css']
})
export class ShowRepasComponent implements OnInit {
  repasList: RepasCommand[] = [];
  displayedColumns: string[] = ['nom', 'prix', 'commentaire', 'cin'];
  displayRepas: boolean = false;
  newRepasForm: FormGroup;

  constructor(private repasService: RepasService, private fb: FormBuilder , private commande : CommanderepasService ) {
    // Initialize the form with custom validators
    this.newRepasForm = this.fb.group({
      nom_du_repas: ['', [Validators.required, this.existingNameValidator.bind(this)]],
      commentaire: ['', Validators.required],
      cin: ['', [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
   this.toggleRepas()  }

  toggleRepas() {
    this.displayRepas = !this.displayRepas;

    if (this.displayRepas) {
      this.loadRepas();
    }
  }

  loadRepas() {
    this.repasService.getAllRepas().subscribe(
      (data: RepasCommand[]) => {
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
    if (control.value && !existingNames.includes(control.value.toLowerCase())) {
        return {'name doesnt exist':true};
        // Return an error if the name already exists
    }
    return null;
  }

  addRepas() {
    if (this.newRepasForm.valid) {
        // Extract values from the form
        const nom_du_repas = this.newRepasForm.value.nom_du_repas;
        if (!nom_du_repas) {
          console.error('Nom du repas cannot be null or empty');
          return; // Early return
        }
  
    
      const existingNames = this.repasList.map(repas => repas.nom.toLowerCase());
  
      
      if (!existingNames.includes(nom_du_repas.toLowerCase())) {
          console.error('This meal name does not exist in the list');
          return; 
        } 
        const commentaire = this.newRepasForm.value.commentaire;
        const cin = this.newRepasForm.value.cin.toString(); 
        const quantity = this.newRepasForm.value.quantity; 

        // Create a RepasCommand object
        const newRepas = {
           nom_du_repas,
            commentaire: commentaire,
            cin: cin,
            quantity: quantity
        };

        // Call the service method with the RepasCommand object
        this.commande.addRepasCommand(newRepas).subscribe(
            (data) => {
                //this.repasList.push(data); // Assuming the service returns the new repas
                this.newRepasForm.reset(); // Reset the form for new input
                this.newRepasForm.markAsPristine(); // Reset the pristine state of the form
            },
            (error) => {
                console.error('Error adding repas', error);
            }
        );
    } else {
        console.warn('Form is not valid');
    }
}
}