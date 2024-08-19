import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepasService } from '../../services/repas.service';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.css']
})
export class RepasComponent implements OnInit {
  repasForm!: FormGroup;
  repasList: any[] = [];
  displayedColumns: string[] = ['nom', 'prix'];
  showAddForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private repasService: RepasService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.repasForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prix: ['', Validators.required],
     
    });
  }

  onSubmit() {
    if (this.repasForm.valid) {
      const repasData = this.repasForm.value;
      this.repasService.addRepas({ 
        nom: repasData.nom, 
        prix: repasData.prix 
      }).subscribe(
        (response) => {
          this.repasList.push(repasData);
          this.repasForm.reset();
          this.showAddForm = false;
        },
        (error) => {
          console.error('Error adding repas', error);
        }
      );
    }
  }
}
