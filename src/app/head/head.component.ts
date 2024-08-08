import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';  // Adjusted import to use the correct class name


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  constructor(private loginService: LoginService ) {  // Fixed constructor syntax
  }

  logout() {
    this.loginService.logout();  // Properly use the service with correct casing
  }
}