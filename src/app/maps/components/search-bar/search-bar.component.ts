import { Component } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { PlacesService } from '../../services';

@Component({
  selector: 'maps-search-bar',
  standalone: true,
  imports: [SearchResultsComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;

  constructor(private placesService: PlacesService) {}

  onQueryChanged(query: string = '') {
    if(this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQuery(query);
    }, 500)
  }
}
