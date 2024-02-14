import { Component } from '@angular/core';

@Component({
  selector: 'maps-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  goToMyLocation() {
    console.log('Go to my location');
  }

}
