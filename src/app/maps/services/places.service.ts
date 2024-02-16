import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeocoderApiClient } from '../api/geocoderApiClient';

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

  constructor(private geocoderApiClient: GeocoderApiClient) {
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
          console.log(err);
          reject();
        }
      )
    })
  }

  getPlacesByQuery(query: string = '') {
    if(!this.useLocation) throw Error('No user location available');

    this.isLoadingPlaces = true;

    this.geocoderApiClient.get<any>(query)
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
        console.log(this.places);
      })
  }
}
