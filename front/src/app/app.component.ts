import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] , 
  animations:  [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Initial styles for the leaving and entering pages
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            transform: 'translateX(100%)', // Entering page starts off-screen to the right
            opacity: 0
          })
        ], { optional: true }),
        
        // Animate the leaving page out and the entering page in
        group([
          query(':leave', [
            animate('1100ms ease-in', style({
              transform: 'translateX(-100%)', // Slide the leaving page to the left
              opacity: 0
            }))
          ], { optional: true }),
          
          query(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }), // Start off-screen
            animate('1100ms ease-out', style({
              transform: 'translateX(0%)', // Slide the entering page to its normal position
              opacity: 1
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'login-app';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
