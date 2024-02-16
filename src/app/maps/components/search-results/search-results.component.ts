import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'maps-search-results',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  constructor(
    private placesServices: PlacesService,
    private mapService: MapService,
    ) {}

  get isLoadingPlaces() {
    return this.placesServices.isLoadingPlaces;
  }

  get places() {
    return this.placesServices.places;
  }

  flyTo(coords: any) {
    const center = [
      coords.bbox[0] + (coords.bbox[2] - coords.bbox[0]) / 2,
      coords.bbox[1] + (coords.bbox[3] - coords.bbox[1]) / 2
    ];
    // const [lng, lat] = place.center;
    this.mapService.flyTo(center);
  }
}
