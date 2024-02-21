import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import maplibregl from 'maplibre-gl';
import "@stadiamaps/maplibre-search-box/dist/style.css";

import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'maps-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
    ){}

  public apiKey: string = import.meta.env['NG_APP_API_KEY'];
  public baseMap: string = 'arcgis/navigation';

  ngAfterViewInit(): void {
    const map = new maplibregl.Map({
      container: this.mapDivElement.nativeElement, // container id
      style: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${this.baseMap}?token=${this.apiKey}`,
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });

    const popup = new maplibregl.Popup({closeOnClick: false})
    .setLngLat(this.placesService.useLocation)
    .setHTML('<h1>Mi location!</h1>')
    .addTo(map);

    new maplibregl.Marker({color: 'green'})
    .setLngLat(this.placesService.useLocation)
    .addTo(map);

    this.mapService.setMap(map);
  }
}
