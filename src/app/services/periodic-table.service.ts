import { Injectable } from '@angular/core';
import { ELEMENT_DATA, PeriodicElement } from '../models/periodic-element';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodicTableService {
  getInitialElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
