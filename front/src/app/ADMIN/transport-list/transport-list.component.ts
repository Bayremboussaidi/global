import { Component, OnInit } from '@angular/core';
import { CommandetransService , TransCommand  } from '../../services/commandetrans.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.css']
})
export class TransportListComponent implements OnInit {
  commandesTrans: TransCommand[] = [];
  errorMessage: string | null = null;

  constructor(private commandeTransService: CommandetransService , private router: Router) { }

  ngOnInit() {
    this.fetchCommandesTrans();
  }

  goToCentralPage() {
    this.router.navigate(['/dash-admin']);
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