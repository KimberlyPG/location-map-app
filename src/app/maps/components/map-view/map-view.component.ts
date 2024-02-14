import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import maplibregl from 'maplibre-gl';

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

  api_key = 'AAPKf75291d90b504783a44c74351dd34613k5K-olkK2EfNBTOCzxrCuXmylGaiKg_SNv5jnsLCjcDkoJ2bxEND0lsXjbI3efoz';

  ngAfterViewInit(): void {
    const map = new maplibregl.Map({
      container: this.mapDivElement.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });

    const popup = new maplibregl.Popup({closeOnClick: false})
    .setLngLat([-96, 37.8])
    .setHTML('<h1>Hello World!</h1>')
    .addTo(map);

    const marker = new maplibregl.Marker()
    .setLngLat([0, 0])
    .addTo(map);

    this.mapService.setMap(map);
  }

}
