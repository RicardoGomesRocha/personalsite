import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntroService {
  percentageToFinish$ = new BehaviorSubject(100);
}
