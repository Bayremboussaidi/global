import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransportService } from '../services/transport.service';

interface Transport {
  id? : number ;
  adresseDest: string;
  dateDepart: string; // Use Date type if you need Date objects
  heureDepart: string; // Use string for time as per your requirement
  selected?: boolean;
}

@Component({
  selector: 'app-show-trans',
  templateUrl: './show-trans.component.html',
  styleUrls: ['./show-trans.component.css']
})
export class ShowTransComponent implements OnInit {
selectAll($event: Event) {
throw new Error('Method not implemented.');
}
  transports: Transport[] = [];
    displayedColumns: string[] = ['adresseDest', 'dateDepart', 'heureDepart', 'selected'];

  constructor(private transportService: TransportService) { }

  ngOnInit(): void {
    this.display(); // Call display on component initialization
  }

  display(): void {
    this.transportService.getAll().subscribe({
      next: (data) => {
        this.transports = data; // Ensure data is of the correct Transport[]
      },
      error: (err) => {
        console.error('Error fetching transports', err);
      }
    });
  }
}
