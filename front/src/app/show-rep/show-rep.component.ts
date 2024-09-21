


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RepasService } from '../services/repas.service';
import { CommanderepasService } from '../services/commanderepas.service';
import { Router } from '@angular/router';

// Define the Repas interface
interface Repas {
  id?: number;
  nom: string;   
  prix: number;  
}

interface RepasCommand {
  nomR: string;   
  commentaire: string;     
  cin: string;           
  quantity: number;       
  id?: number;           
}

@Component({
  selector: 'app-show-repas',
  templateUrl: './show-rep.component.html',
  styleUrls: ['./show-rep.component.css']
})
export class ShowRepasComponent implements OnInit {
  repasList: Repas[] = []; // List of meals
  displayedColumns: string[] = ['nom', 'prix'];
  displayRepas: boolean = false; 
  newRepasForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private repasService: RepasService, 
    private fb: FormBuilder, 
    private commande: CommanderepasService,
    private router: Router
  ) {
    
    this.newRepasForm = this.fb.group({
      nomR: [' ', [Validators.required]], 
      commentaire: ['  ', Validators.required],
      cin: [' '],
      quantity: [1, [Validators.required, Validators.min(1)]], 
    });
  }

  ngOnInit(): void {
    this.displayRepas = true; 
    this.loadRepas(); 
  }

  goToCentralPage() {
    this.router.navigate(['/dashboard']);
  }

  loadRepas() {
    this.repasService.getAllRepas().subscribe(
      (data: Repas[]) => {
        this.repasList = data.map(item => ({
          id: item.id,
          nom: item.nom,
          prix: item.prix, 
        }));
      },
      (error) => {
        console.error('Error fetching repas', error);
      }
    );
  }

  existingNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const existingNames = this.repasList.map(repas => repas.nom.toLowerCase());
    
    if (control.value && !existingNames.includes(control.value.toLowerCase())) {
      return { 'nameDoesNotExist': true }; 
    }
    return null;
  }

  addRepas() {
    if (this.newRepasForm.valid) {
      
      const nomR = this.newRepasForm.value.nomR; 
      const commentaire = this.newRepasForm.value.commentaire;
      const cin = this.newRepasForm.value.cin.toString();
      const quantity = this.newRepasForm.value.quantity;

      const newRepasCommand: RepasCommand = {
        nomR,  
        commentaire,
        cin,
        quantity,
      };

      this.loading = true;
      this.errorMessage = null; 

     
      this.commande.addRepasCommand(newRepasCommand).subscribe(
        (data) => {
          
          this.repasList.push({ 
            nom: nomR,
            prix: 0 
          });
          
          
          this.newRepasForm.reset();
          this.newRepasForm.markAsPristine();
        },
        (error) => {
          console.error('Error adding repas command', error);
          this.errorMessage = 'An error occurred while adding the repas command. Please try again.'; 
        },
        () => {
          this.loading = false; 
        }
      );
    } else {
      console.warn('Form is not valid');
    }
  }
}