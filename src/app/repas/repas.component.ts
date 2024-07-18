import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.css']
})
export class RepasComponent implements OnInit {
  showAddForm: boolean = false;
  repasForm: FormGroup;
  repasList: any[] = [];
  displayedColumns: string[] = ['nom', 'disponible', 'commandePar'];

  constructor(private formBuilder: FormBuilder) {
    this.repasForm = this.formBuilder.group({
      nom: ['', Validators.required],
      disponible: ['', Validators.required],
      commandePar: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.repasForm.valid) {
      this.repasList.push(this.repasForm.value);
      this.repasForm.reset();
      this.showAddForm = false;
    }
  }
}
