import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, from, map, Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  $categories: Observable<Category[]>;
  $filterResults: Observable<Category[]>;
  private filter = '';
  private filterCategories: Category[] | undefined;
  private $searchText = new BehaviorSubject<string>('');
  private categoriesCollection: AngularFirestoreCollection<Category>;

  constructor(private readonly afs: AngularFirestore) {
    this.categoriesCollection = afs.collection<Category>('categories');
    this.$categories = this.categoriesCollection.valueChanges({
      idField: 'id',
    });
    this.$filterResults = combineLatest([
      this.$categories,
      this.$searchText,
    ]).pipe(
      map((value: [Category[], string]) => {
        const categories = value[0];
        const searchText = value[1];
        return categories.filter((categories) =>
          categories.text.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    );
  }

  setSearchTextFilter(text: string): void {
    this.$searchText.next(text);
  }

  getDocumentReferenceFromCategories(
    categories: Category[] | undefined
  ): DocumentReference<Category>[] {
    if (!categories) {
      return [];
    }
    return categories.map(
      (category) => this.afs.doc<Category>(`categories/${category.id}`).ref
    );
  }

  getCategoriesFromDocumentReference(
    categoriesRef: DocumentReference<Category>[]
  ): Observable<Category[]> {
    const ids = categoriesRef.map((refs) => refs.id);
    const filterIds = categoriesRef.map((category) => category.id);
    return this.afs
      .collection<Category>('categories', (result) => {
        return result.where('id', 'in', ids);
      })
      .valueChanges({ idField: 'id' });
  }

  addCategory(text: string): Observable<DocumentReference<Category>> {
    return from(
      this.categoriesCollection.add({
        text,
      } as Category)
    );
  }
}
