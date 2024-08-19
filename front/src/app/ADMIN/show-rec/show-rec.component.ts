import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-show-reclamation',
  templateUrl: './\show-rec.component.html',
  styleUrls: ['./show-rec.component.css']
})
export class ShowReclamationComponent implements OnInit {
  reclamationList: any[] = []; // Replace with your data model
  displayReclamations: boolean = false;

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.toggleReclamations() ;
  }

  toggleReclamations() {
    this.displayReclamations  = true ;/*= !this.displayReclamations;*/

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
}
