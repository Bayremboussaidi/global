/*import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-reclamation',
  templateUrl: './\show-rec.component.html',
  styleUrls: ['./show-rec.component.css']
})
export class ShowReclamationComponent implements OnInit {
  reclamationList: any[] = []; // Replace with your data model
  displayReclamations: boolean = false;

  constructor(private reclamationService: ReclamationService , private router: Router) { }

  ngOnInit(): void {
    this.toggleReclamations() ;
  }
  goToCentralPage() {
    this.router.navigate(['/dash-admin']);
  }

  toggleReclamations() {
    this.displayReclamations  = true ;

    if (this.displayReclamations) {
      this.loadReclamations();
    }
  }

  loadReclamations() {
    this.reclamationService.getAllReclamations().subscribe(
      (data: any[]) => {
        this.reclamationList = data;
      },
      (error) => {
        console.error('Error fetching reclamations', error);
      }
    );
  }
}*/

import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-reclamation',
  templateUrl: './show-rec.component.html',
  styleUrls: ['./show-rec.component.css']
})
export class ShowReclamationComponent implements OnInit {
  reclamationList: any[] = []; // Replace with your data model if available
  displayReclamations: boolean = false;
displayedColumns: any;

  constructor(private reclamationService: ReclamationService, private router: Router) { }

  ngOnInit(): void {
    this.toggleReclamations();
  }

  goToCentralPage() {
    this.router.navigate(['/dash-admin']);
  }

  toggleReclamations() {
    this.displayReclamations = !this.displayReclamations;

    if (this.displayReclamations) {
      this.loadReclamations();
    }
  }

  loadReclamations() {
    this.reclamationService.getAllReclamations().subscribe(
      (data: any[]) => {
        this.reclamationList = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching reclamations', error);
      }
    );
  }
}
