import { Injectable } from '@angular/core';
import { GeocoderApiClient } from '../api/geocoderApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: any[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private geocoderApiClient: GeocoderApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('Cannot get geolocation');
          console.log(['placesService'], err);
          reject();
        }
      )
    })
  }

  getPlacesByQuery(query: string = '') {
    if(query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if(!this.useLocation) throw Error('No user location available');

    this.isLoadingPlaces = true;

    this.geocoderApiClient.get<any>(query)
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      })
  }

  deletePlaces() {
    this.places = [];
  }
}
