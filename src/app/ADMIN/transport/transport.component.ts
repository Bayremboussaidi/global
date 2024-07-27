import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  showAddForm: boolean = false;
  transportForm: FormGroup;
  transportList: any[] = [];
  displayedColumns: string[] = ['adresseDest', 'dateDepart', 'heureDepart'];

  constructor(private formBuilder: FormBuilder) {
    this.transportForm = this.formBuilder.group({
      adresseDest: ['', Validators.required],
      dateDepart: ['', Validators.required],
      heureDepart: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.transportForm.valid) {
      this.transportList.push(this.transportForm.value);
      this.transportForm.reset();
      this.showAddForm = false;
    }
  }
}
