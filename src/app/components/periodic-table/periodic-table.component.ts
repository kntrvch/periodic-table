import { Component } from '@angular/core';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { RxState } from '@rx-angular/state';
import { PeriodicElement } from '../../models/periodic-element';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [FilterInputComponent],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})
export class PeriodicTableComponent {
  constructor(
    public state: RxState<{ elements: PeriodicElement[]; filter: string }>
  ) {
  }

  ngOnInit() {
    this.state.select().subscribe((state) => console.log(state));
  }
}
