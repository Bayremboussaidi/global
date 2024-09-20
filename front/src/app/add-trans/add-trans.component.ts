import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TransportService } from 'src/app/services/transport.service';

export interface Transport {
  adresseDest: string;
  dateDepart: string;
  heureDepart: string;
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

  constructor(private formBuilder: FormBuilder, private transportservice: TransportService , private router : Router) {
    this.transportForm = this.formBuilder.group({ // Create the form group
      adresseDest: ['', Validators.required],
      dateDepart: ['', Validators.required],
      heureDepart: ['',Validators.required],
      NbrePlace: [1, Validators.required],
      numID: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] // Use a pattern for number validation
    });
  }

  ngOnInit(): void {
    this.showAddForm = true; // Show the form on initiation
  }

  
 goToCentralPage() {
  this.router.navigate(['/dashboard']);
}
  onSubmit() {
    if (this.transportForm.valid) {
      // Use the Transport type here
      const newTransport: Transport = this.transportForm.value; 
      this.transportservice.add(newTransport).subscribe(
        (addedTransport: Transport) => { 
          this.transportList.push(addedTransport); 
          this.transportForm.reset(); // Reset form after adding to list
          //this.showAddForm = false; // Optionally hide the form after submission
        },
        error => {
          console.error('Error adding transport', error);
        }
      );
    }
  }
}