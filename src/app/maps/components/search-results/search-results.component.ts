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

  public selectedId: string = '';

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

  flyTo(feature: any) {
    this.selectedId = feature.properties.place_id;
    const center = [
      feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
      feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
    ];
    this.mapService.flyTo(center);
  }
}
