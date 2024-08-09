import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service"

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  constructor(private authservice: AuthService ) {  // Fixed constructor syntax
  }

  logout(): void {
    this.authservice.logout();
  }
}