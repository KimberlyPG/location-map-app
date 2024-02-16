import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class GeocoderApiClient extends HttpClient {

  public baseUrl: string = 'https://nominatim.openstreetmap.org/search?q=';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public override get<T>(url: string, options?: {
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  }) {
    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        format: 'geojson',
        polygon_geojson: 1,
        addressdetails: 1,
        limit: 5,
        // ...options.params,
      }
    });
  }

}
