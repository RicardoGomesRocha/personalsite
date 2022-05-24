import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search, SearchableService } from '../search/search.model';
import { GlobalSearchService } from '../services/global-search.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements SearchableService {
  $searchResults: Observable<Search[]>;

  constructor(private readonly globalSearchService: GlobalSearchService) {
    this.$searchResults = this.globalSearchService.$searchResults;
  }
  setSearchTextFilter(text: string): void {
    this.globalSearchService.setSearchTextFilter(text);
  }
}
