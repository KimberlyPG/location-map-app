import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MapViewComponent } from '../../components/map-view/map-view.component';

@Component({
  standalone: true,
  imports: [LoadingComponent, MapViewComponent],
  selector: 'maps-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent {

  constructor(private placesService: PlacesService) {}

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
