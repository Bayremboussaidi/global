import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isExpanded = false;

  ngOnInit(): void {
    // Initialize any additional logic if needed
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (event.clientY < 50) { // Adjust the threshold as needed
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }
}
