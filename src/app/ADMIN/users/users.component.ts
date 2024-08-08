import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Ensure the path is correct

interface User {
  id: number;      // Unique identifier for each user
  nom: string;     // Last name
  prenom: string;  // First name
  sexe: 'Masculin' | 'Féminin' | 'Autre'; // Gender
  tel: string;     // Phone number
  email: string;   // Email address
  poste: string;   // Job title/position
  cin: string;     // National identity card number
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: User[] = []; // Declare and initialize a users property

  constructor(private userService: UserService) {} 

  ngOnInit(): void {
    this.display(); // Fetch users when the component initializes
  }

  display() {
    this.userService.getUsers().subscribe(
      (response: User[] | any) => {
        this.users = response; // Store the users in the component property
        console.log(this.users); // Optional: Log the users to the console
      },
      (error) => {
        console.error('Error fetching users:', error); // Handle errors here
      }
    );
  }
}