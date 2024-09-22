import { Injectable } from '@angular/core';
import { ELEMENT_DATA, PeriodicElement } from '../models/periodic-element';
import { delay, Observable, of } from 'rxjs';
import { RxState } from '@rx-angular/state';

@Injectable({
  providedIn: 'root',
})
export class PeriodicTableService {
  constructor(
    private state: RxState<{ elements: PeriodicElement[]; filter: string }>
  ) {}

  getInitialElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
