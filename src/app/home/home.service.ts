import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Search, SearchableService } from '../search/search.model';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements SearchableService {
  $searchResults: Observable<Search[]>;

  constructor(private readonly projectService: ProjectService) {
    this.$searchResults = combineLatest([
      this.projectService.$searchResults,
    ]).pipe(map((value) => [...value[0]]));
  }

  setSearchTextFilter(text: string): void {
    this.projectService.setSearchTextFilter(text);
  }
}
