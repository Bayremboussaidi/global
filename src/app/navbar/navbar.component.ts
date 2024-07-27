import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';  // Adjust the path as needed

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profilePicUrl: string | ArrayBuffer | null = null;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.profilePic$.subscribe(url => {
      this.profilePicUrl = url || null; // Ensure it's never undefined
    });
  }
}
