import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-a',
  templateUrl: './dashboard-a.component.html',
  styleUrls: ['./dashboard-a.component.css']
})
export class DashboardAComponent {

  tableData = [
    { jobId: 42235, customerName: 'John Doe', amount: 350, paymentStatus: 'Pending' },
    { jobId: 42442, customerName: 'Jennifer Smith', amount: 220, paymentStatus: 'Pending' },
    { jobId: 42257, customerName: 'John Smith', amount: 341, paymentStatus: 'Pending' },
    { jobId: 42311, customerName: 'John Carpenter', amount: 115, paymentStatus: 'Pending' },
  ];

  handleButtonClick(value: any): void {
    console.log('Button clicked:', value);
  }

}



