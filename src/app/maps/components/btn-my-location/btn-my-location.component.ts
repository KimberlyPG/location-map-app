import { Component } from '@angular/core';
import { PlacesService, MapService } from '../../services';

@Component({
  selector: 'maps-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
  ) {}

  goToMyLocation() {
    if(!this.placesService.isUserLocationReady) throw Error('No user location');
    if(!this.mapService.isMapReady) throw Error('Map not available');

    this.mapService.flyTo(this.placesService.useLocation!);
  }

}
