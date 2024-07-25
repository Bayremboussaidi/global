import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isExpanded = false;

  ngOnInit(): void {
    
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (event.clientY < 50) { 
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }
}
