import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Search, SearchableService } from './search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent {
  searchControl = new FormControl();

  @Input()
  lightBackground = true;

  @Input()
  placeholder: string | undefined;

  @Input()
  search$: Observable<Search[]> | undefined;

  @Input()
  set searchService(service: SearchableService) {
    this.search$ = service.$searchResults;
    this._searchService = service;
  }

  private _searchService: SearchableService | undefined;

  search(text: KeyboardEvent) {
    this._searchService?.setSearchTextFilter(
      (<HTMLInputElement>text.currentTarget).value
    );
  }
}
