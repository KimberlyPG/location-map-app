import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';
import maplibregl from 'maplibre-gl';

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

  constructor(private placesService: PlacesService){}

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

  }

}
