import { Component, OnInit } from '@angular/core';
import { CommanderepasService, RepasCommand } from '../../services/commanderepas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repas-list',
  templateUrl: './repas-list.component.html',
  styleUrls: ['./repas-list.component.css']
})
export class RepasListComponent implements OnInit {
  commandesRepas: RepasCommand[] = [];
  errorMessage: string | null = null;

  constructor(private commandeRepasService: CommanderepasService , private router: Router) { }

  ngOnInit() {
    this.fetchCommandesRepas();
  }
  goToCentralPage() {
    this.router.navigate(['/dash-admin']);
  }

  fetchCommandesRepas() {
    this.commandeRepasService.getAllRepasCommands().subscribe(
      (data: RepasCommand[]) => {
        this.commandesRepas = data;
      },
      (error) => {
        console.error('Error fetching commandes de repas', error);
        this.errorMessage = 'Failed to load data';
      }
    );
  }
}