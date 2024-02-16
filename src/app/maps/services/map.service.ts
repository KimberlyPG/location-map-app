import { Injectable } from '@angular/core';

import { LngLatLike, Map, Marker, Popup } from 'maplibre-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike | any) {
    if(!this.isMapReady) throw Error('The map is not initialized');

    this.map.flyTo({
      zoom: 14,
      center: coords,
    })
  }

  createMarkersFromPlaces(places: Feature[]) {
    if (!this.map) throw Error('Map not initialized');

    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for(const place of places) {
      const center: LngLatLike = [
        place.bbox[0] + (place.bbox[2] - place.bbox[0]) / 2,
        place.bbox[1] + (place.bbox[3] - place.bbox[1]) / 2
      ];
      const popup = new Popup()
        .setHTML(`
          <h6>${place.properties.name}</h6>
          <span>${place.properties.display_name}</span>
        `);

      const newMarker = new Marker()
        .setLngLat(center)
        .setPopup(popup)
        .addTo(this.map)

        newMarkers.push(newMarker);
    }

    this.markers = newMarkers;
  }

}
