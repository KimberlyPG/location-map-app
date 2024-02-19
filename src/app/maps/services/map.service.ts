import { Injectable } from '@angular/core';

import { LngLatBounds, LngLatLike, Map, Marker, Popup, SourceSpecification } from 'maplibre-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { RoutesResponse } from '../interfaces/directions';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  constructor(private directionsApiClient: DirectionsApiClient) {}

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike | any) {
    if (!this.isMapReady) throw Error('The map is not initialized');

    this.map.flyTo({
      zoom: 14,
      center: coords,
    });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('Map not initialized');

    this.markers.forEach((marker) => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const center: LngLatLike = [
        place.bbox[0] + (place.bbox[2] - place.bbox[0]) / 2,
        place.bbox[1] + (place.bbox[3] - place.bbox[1]) / 2,
      ];
      const popup = new Popup().setHTML(`
          <h6>${place.properties.name}</h6>
          <span>${place.properties.display_name}</span>
        `);

      const newMarker = new Marker()
        .setLngLat(center)
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    // map limits
    const bounds = new LngLatBounds();

    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200,
    });
  }

  getRoutes(start: [number, number], end: [number, number]) {
    this.directionsApiClient
      .get<any>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((resp) => this.drawRouteLine(resp.routes[0]));
  }

  drawRouteLine(route: RoutesResponse) {
    if (!this.map) throw Error('Mapa no inicializado');

    const coords: Array<number[]> = route.geometry.coordinates;
    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]: number[]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds(bounds, {
      padding: 200,
    });

    const routeSource: SourceSpecification =  {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
      },
    };

    if ( this.map.getLayer('route') ) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }

    this.map.addSource('route', routeSource),

    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': 'red',
        'line-width': 5,
      },
    });
  }
}
