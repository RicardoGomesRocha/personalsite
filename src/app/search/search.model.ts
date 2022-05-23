import { Observable } from 'rxjs';

export interface Search {
  title: string;
  text: string[];
  image: string;
  link: string;
  categories: string[];
}

export enum SearchTheme {
  Light,
  Dark,
}

export interface SearchableService {
  $searchResults: Observable<Search[]>;
  setSearchTextFilter(text: string): void;
}
