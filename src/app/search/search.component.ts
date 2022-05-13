import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Search } from './search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent {
  searchControl = new FormControl();

  @Input()
  search$: Observable<Search[]> = new BehaviorSubject([
    {
      title: 'This is a title',
      text: ['This is a small description', 'This is a description'],
      image: '/assets/triangles-background.jpg',
      link: 'project/someId',
      categories: ['animals', 'places', 'projects'],
    },
    {
      title: 'This is a title',
      text: ['This is a small description', 'This is a description'],
      image: '/assets/triangles-background.jpg',
      link: 'project/someId',
      categories: ['animals', 'places', 'projects'],
    },
    {
      title: 'This is a title',
      text: ['This is a small description', 'This is a description'],
      image: '/assets/triangles-background.jpg',
      link: 'project/someId',
      categories: ['animals', 'places', 'projects'],
    },
  ]);
}
