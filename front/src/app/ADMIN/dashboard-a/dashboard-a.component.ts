import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-a',
  templateUrl: './dashboard-a.component.html',
  styleUrls: ['./dashboard-a.component.css']
})
export class DashboardAComponent {
  constructor(private loginservice: LoginService , private router : Router) {  // Fixed constructor syntax
  }

  

  handleButtonClick(value: any): void {
    console.log('Button clicked:', value);
  }

  logout(): void {
    this.loginservice.logout();
    this.router.navigate(['/signin']);

  }

}



