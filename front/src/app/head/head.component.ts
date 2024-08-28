import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  constructor(private loginservice: LoginService  , private router :Router) {  // Fixed constructor syntax
  }

  logout(): void {
    this.loginservice.logout();

    this.router.navigate(['/signin']);
  }
}