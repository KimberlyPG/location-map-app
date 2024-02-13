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
    var map = new maplibregl.Map({
      container: this.mapDivElement.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
  });
  }

}
