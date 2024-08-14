import { Component } from '@angular/core';
import {LoginService} from "../services/login.service"

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  constructor(private loginservice: LoginService ) {  // Fixed constructor syntax
  }

  logout(): void {
    this.loginservice.logout();
  }
}