import { Component, OnInit } from '@angular/core';
import { CommandetransService , TransCommand  } from '../../services/commandetrans.service';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.css']
})
export class TransportListComponent implements OnInit {
  commandesTrans: TransCommand[] = [];
  errorMessage: string | null = null;

  constructor(private commandeTransService: CommandetransService) { }

  ngOnInit() {
    this.fetchCommandesTrans();
  }

  fetchCommandesTrans() {
    this.commandeTransService.getAllCommandesTrans().subscribe(
      (data: TransCommand[]) => {
        this.commandesTrans = data;
      },
      (error) => {
        console.error('Error fetching commandes de transport', error);
        this.errorMessage = 'Failed to load transport data';
      }
    );
  }
}