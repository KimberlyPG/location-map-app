import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import maplibregl, { NavigationControl } from 'maplibre-gl';
import { MapLibreSearchControl } from "@stadiamaps/maplibre-search-box";
import "@stadiamaps/maplibre-search-box/dist/style.css";

import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';
import { environment } from '../../../../environments/environments';

import { ApiKeyManager } from "@esri/arcgis-rest-request";
import { geocode } from '@esri/arcgis-rest-geocoding';

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

  public apiKey: string = environment.apiKey;
  public baseMap: string = 'arcgis/navigation';

  ngAfterViewInit(): void {
    const map = new maplibregl.Map({
      container: this.mapDivElement.nativeElement, // container id
      style: `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${this.baseMap}?token=${this.apiKey}`,
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

    const control = new MapLibreSearchControl({
      onResultSelected: feature => {
        console.log(feature.geometry.coordinates);
      },
      useMapFocusPoint: true,
      mapFocusPointMinZoom: 5,
      searchOnEnter: false,
      maxResults: 5,
      minInputLength: 3,
      minWaitPeriodMs: 100,
      // onResultSelected?: (feature: PeliasGeoJSONFeature) => void,
    });

    // map.addControl(control, "top-left");

  // geocode({
  //   singleLine: 'Hon',
  //   authentication: ApiKeyManager.fromKey(this.apiKey)
  //   // params: {
  //   //   location: map.getCenter().toArray().join(","), // center of map as longitude,latitude
  //   //   outFields: "*" // return all fields
  //   // }
  // }).then((response)=>{
  //   console.log({response});
  // })

    this.mapService.setMap(map);
  }

}
