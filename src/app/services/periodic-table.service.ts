import { Injectable } from '@angular/core';
import { ELEMENT_DATA, PeriodicElement } from '../models/periodic-element';
import { debounceTime, delay, Observable, of } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { PeriodicElementState } from '../models/periodic-element-state';

@Injectable({
  providedIn: 'root',
})
export class PeriodicTableService {
  constructor(private state: RxState<PeriodicElementState>) {}

  getInitialElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }

  setState(state: PeriodicElementState) {
    this.state.set(state);
  }

  getState(): PeriodicElementState {
    return this.state.get();
  }

  connectFilter(filterStream: Observable<string>) {
    this.state.connect('filter', filterStream.pipe(debounceTime(2000)));
  }
}
