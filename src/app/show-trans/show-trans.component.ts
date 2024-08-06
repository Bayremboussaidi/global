import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Item {
  id: number;
  chemin: string;
  departure: string;
  Arrivee: string ;
  selected: boolean;
}

@Component({
  selector: 'app-show-trans',
  templateUrl: './show-trans.component.html',
  styleUrls: ['./show-trans.component.css']
})
export class ShowTransComponent {

  items: Item[] = [
    { id: 1, chemin: 'lac2 - ariena', departure: '17:30', Arrivee : '18:20' ,selected: false },
    { id: 2, chemin: 'lac 2 - ben Arous', departure: '17:00',  Arrivee  :'18:00' ,selected: false },
    { id: 3, chemin: 'lac 2 - marsa', departure: '2024-07-03', Arrivee  : '', selected: false }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  selectAll(event: any): void {
    const checked = event.target.checked;
    this.items.forEach(item => item.selected = checked);
  }

  onSubmit(): void {
    const selectedItems = this.items.filter(item => item.selected);
    this.http.post('http://localhost:8084/commanderepas', selectedItems).subscribe(response => {
      console.log('POST request successful', response);
    }, error => {
      console.error('POST request error', error);
    });
  }

}



