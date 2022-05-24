import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Search, SearchableService } from '../search/search.model';
import { BlogService } from '../services/blog.service';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService implements SearchableService {
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
