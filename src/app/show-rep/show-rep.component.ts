import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Item {
  id: number;
  name: string;
  description: string;
  selected: boolean;
}

@Component({
  selector: 'app-show-rep',
  templateUrl: './show-rep.component.html',
  styleUrls: ['./show-rep.component.css']
})
export class ShowRepComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  items: Item[] = [
    { id: 1, name: 'Item 1', description: 'Description 1', selected: false },
    { id: 2, name: 'Item 2', description: 'Description 2', selected: false },
    { id: 3, name: 'Item 3', description: 'Description 3', selected: false }
  ];


  selectAll(event: any): void {
    const checked = event.target.checked;
    this.items.forEach(item => item.selected = checked);
  }

  deleteSelected(): void {
    this.items = this.items.filter(item => !item.selected);
  }

  /*onSubmit(): void {
    const selectedItems = this.items.filter(item => item.selected);
    this.http.post('http://your-api-url.com/submit', selectedItems).subscribe(response => {
      console.log('POST request successful', response);
    }, error => {
      console.error('POST request error', error);
    });
  }*/
}





