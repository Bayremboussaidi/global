import { Component, OnInit } from '@angular/core';
import { RepasService } from '../services/repas.service';

@Component({
  selector: 'app-show-repas',
  templateUrl: './show-rep.component.html',
  styleUrls: ['./show-rep.component.css']
})
export class ShowRepasComponent implements OnInit {
  repasList: any[] = [];
  displayedColumns: string[] = ['nom', 'prix', 'commentaire', 'cin'];
  displayRepas: boolean = false;

  constructor(private repasService: RepasService) { }

  ngOnInit(): void {
    // Initially, the repas are not displayed
  }

  toggleRepas() {
    this.displayRepas = !this.displayRepas;

    if (this.displayRepas) {
      this.loadRepas();
    }
  }

  loadRepas() {
    this.repasService.getAllRepas().subscribe(
      (data: any[]) => {
        this.repasList = data;
      },
      (error) => {
        console.error('Error fetching repas', error);
      }
    );
  }
}
