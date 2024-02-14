import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MapViewComponent } from '../../components/map-view/map-view.component';
import { AngularLogoComponent } from '../../components/angular-logo/angular-logo.component';
import { CommonModule } from '@angular/common';
import { BtnMyLocationComponent } from '../../components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    MapViewComponent,
    AngularLogoComponent,
    BtnMyLocationComponent,
    SearchBarComponent
  ],
  selector: 'maps-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css',
})
export class MapScreenComponent {
  constructor(private placesService: PlacesService) {}

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }
}
