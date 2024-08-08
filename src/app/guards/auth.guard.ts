import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming you have an AuthService to manage user sessions

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; // Get expected role from route data
    const userRole = this.authService.getUserRole(); // Get the user's role from your auth service

    if (userRole !== expectedRole) {
      // Redirect to a different page if the user does not have permission
      this.router.navigate(['unauthorized']); // Change this to the path you'd like to redirect
      return false;
    }
    return true; // Allow access if the role matches
  }
}