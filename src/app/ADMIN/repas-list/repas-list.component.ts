import { Component, OnInit } from '@angular/core';
import { CommanderepasService, RepasCommand } from '../../services/commanderepas.service';

@Component({
  selector: 'app-repas-list',
  templateUrl: './repas-list.component.html',
  styleUrls: ['./repas-list.component.css']
})
export class RepasListComponent implements OnInit {
  commandesRepas: RepasCommand[] = [];
  errorMessage: string | null = null;

  constructor(private commandeRepasService: CommanderepasService) { }

  ngOnInit() {
    this.fetchCommandesRepas();
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