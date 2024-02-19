import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DirectionsApiClient extends HttpClient {

  public baseUrl = 'http://router.project-osrm.org/route/v1/driving/';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public override get<T>(url: string) {
    url = this.baseUrl + url;
    return super.get<T>(url, {
      params: {
        geometries: 'geojson'
      }
    })
  }

}
