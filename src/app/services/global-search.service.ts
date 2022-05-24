import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Search, SearchableService } from '../search/search.model';
import { BlogService } from './blog.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchService implements SearchableService {
  $searchResults: Observable<Search[]>;

  constructor(
    private readonly projectService: ProjectService,
    private readonly blogService: BlogService
  ) {
    this.$searchResults = combineLatest([
      this.projectService.$searchResults,
      this.blogService.$searchResults,
    ]).pipe(map((value) => [...value[0], ...value[1]]));
  }

  setSearchTextFilter(text: string): void {
    this.projectService.setSearchTextFilter(text);
    this.blogService.setSearchTextFilter(text);
  }
}
