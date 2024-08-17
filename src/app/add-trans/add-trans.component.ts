import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransportService } from 'src/app/services/transport.service';

interface Transport {
  adresseDest: string;
  dateDepart: string;
  NbrePlace: number; // Use proper type
  numID : number;
}

@Component({
  selector: 'app-add-trans',
  standalone: false,
 
  templateUrl: './add-trans.component.html',
  styleUrls: ['./add-trans.component.css'] // Corrected styleUrl to styleUrls
})
export class AddTransComponent implements OnInit {
  showAddForm: boolean = true;
  transportForm: FormGroup;
  transportList: Transport[] = []; // Change type to Transport for better type safety
  displayedColumns: string[] = ['adresseDest', 'dateDepart', 'NbrePlace'];

  constructor(private formBuilder: FormBuilder, private transportservice: TransportService) {
    this.transportForm = this.formBuilder.group({ // Create the form group
      adresseDest: ['', Validators.required],
      dateDepart: ['', Validators.required],
      NbrePlace: [1, Validators.required],
      numID: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] // Use a pattern for number validation
    });
  }

  ngOnInit(): void {
    this.showAddForm = true; // Show the form on initiation
  }

  onSubmit() {
    if (this.transportForm.valid) {
      // Use the Transport type here
      const newTransport: Transport = this.transportForm.value; 
      this.transportservice.add(newTransport).subscribe(
        (addedTransport: Transport) => { 
          this.transportList.push(addedTransport); 
          this.transportForm.reset(); // Reset form after adding to list
          this.showAddForm = false; // Optionally hide the form after submission
        },
        error => {
          console.error('Error adding transport', error);
        }
      );
    }
  }
}