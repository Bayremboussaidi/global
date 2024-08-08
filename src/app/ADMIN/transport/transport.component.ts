import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportService } from 'src/app/services/transport.service';


interface Transport {
  adresseDest: string;
  dateDepart: string; // Use Date type if you need Date objects
  heureDepart: string; // Use string for time as per your requirement
}

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

  constructor(private formBuilder: FormBuilder , private transportservice : TransportService   ) {
    this.transportForm = this.formBuilder.group({
      adresseDest: ['', Validators.required],
      dateDepart: ['', Validators.required],
      heureDepart: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.transportForm.valid) {
      // Use the Transport type here instead of TransportService
      const newTransport: Transport = this.transportForm.value; 
      this.transportservice.add(newTransport).subscribe(
          // Use Transport as the type for addedTransport
          (addedTransport: Transport) => { 
              this.transportList.push(addedTransport); // Add the new transport to the list
              this.transportForm.reset(); // Clear the form
              this.showAddForm = false;
          },
          error => {
              console.error('Error adding transport', error);
          }
      );
  }
}}
