import { Component, EventEmitter, Input } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input()
  title = 'Categories';

  @Input()
  categories = new Array<Category>();

  @Input()
  categoriesChange = new EventEmitter<Category[]>();

  $filterCategories: Observable<Category[]>;

  $categoriesChanged = new BehaviorSubject<Category[]>(this.categories);

  constructor(private readonly categoriesService: CategoriesService) {
    this.$filterCategories = combineLatest([
      this.categoriesService.$filterResults,
      this.$categoriesChanged,
    ]).pipe(
      map((results) => {
        return results[0].filter((category) => {
          return results[1].find((_category) => _category.id === category.id)
            ? false
            : true;
        });
      })
    );
  }

  addCategoryFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.categoriesService
        .addCategory(event.value)
        .subscribe((categoryRef) => {
          this.addCategory({ id: categoryRef.id, text: event.value });
        });
      event.chipInput!.clear();
    }
  }

  removeCategory(categoryId: string) {
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId
    );
    this.categoriesChange.emit(this.categories);
    this.$categoriesChanged.next(this.categories);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addCategory(event.option.value);
  }

  filter(text: KeyboardEvent) {
    this.categoriesService.setSearchTextFilter(
      (<HTMLInputElement>text.currentTarget).value
    );
  }

  private addCategory(category: Category) {
    this.categories.push({ id: category.id, text: category.text });
    this.categoriesChange.emit(this.categories);
    this.$categoriesChanged.next(this.categories);
  }
}
