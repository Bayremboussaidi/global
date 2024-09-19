import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            transform: 'translateX(100%)', 
            opacity: 0
          })
        ], { optional: true }),
        
        
        group([
          query(':leave', [
            animate('1100ms ease-in', style({
              transform: 'translateX(-100%)', 
              opacity: 0
            }))
          ], { optional: true }),
          
          query(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }), 
            animate('1100ms ease-out', style({
              transform: 'translateX(0%)', 
              opacity: 1
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  backgroundImages: string[] = [
    '../../assets/background/340165753_745424727244126_8682703632485739289_n.jpg',
    '../../assets/background/340447842_778360583661912_1911248590948974988_n.jpg',
    '../../assets/background/340538618_770068184633203_2384861782352685956_n.jpg',
    '../../assets/background/340165753_745424727244126_8682703632485739289_n.jpg',
    '../../assets/background/351510565_287705736937249_4367969976352776123_n.jpg',
    '../../assets/background/351511263_3174697542820574_6405152296799640684_n.jpg',
    '../../assets/background/340165753_745424727244126_8682703632485739289_n.jpg',
    '../../assets/background/393361940_259697227047914_7918249808440879743_n.jpg',
    '../../assets/background/416002768_305094329174870_1086032252678069552_n.jpg',
    '../../assets/background/417881710_307603682257268_5642425247278348527_n.jpg',
    '../../assets/background/419219554_312502225100747_1006485778911925445_n.jpg',
    '../../assets/background/419252326_312502215100748_2400738835189134458_n.jpg',
    '../../assets/background/425918908_325486357135667_9041551307390824759_n.jpg',
    '../../assets/background/460428254_501404002778546_683244960579339580_n.jpg',
    '../../assets/background/460589992_501398212779125_4804014409469360218_n.jpg'


  ];
  currentBackground: string = this.backgroundImages[0];
  private intervalId: any;

  ngOnInit() {
    let index = 0;
    this.intervalId = setInterval(() => {
      index = (index + 1) % this.backgroundImages.length;
      this.currentBackground = this.backgroundImages[index];
    }, 10000); // 10000 ms is 10 seconds
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clean up the interval when the component is destroyed
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
