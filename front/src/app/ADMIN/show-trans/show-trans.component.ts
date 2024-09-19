import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransportService } from '../../services/transport.service';
import { Router } from '@angular/router';


interface Transport {
  id? : number ;
  adresseDest: string;
  dateDepart: string; 
  NbrePlace: number;
  numID : number;
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
    displayedColumns: string[] = ['adresseDest', 'dateDepart', 'NbrePlace', 'numID'];

  constructor(private transportService: TransportService , private router: Router) { }

  ngOnInit(): void {
    this.display(); 
  }

  goToCentralPage() {
    this.router.navigate(['/dash-admin']);
  }

  display(): void {
    this.transportService.getAll().subscribe({
      next: (data) => {
        this.transports = data; 
      },
      error: (err) => {
        console.error('Error fetching transports', err);
      }
    });
  }
}
