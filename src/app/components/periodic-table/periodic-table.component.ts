import { Component } from '@angular/core';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { RxState } from '@rx-angular/state';
import { PeriodicElementState } from '../../models/periodic-element-state';
import { PeriodicElement } from '../../models/periodic-element';
import { combineLatest, map, Observable } from 'rxjs';
import { PeriodicTableService } from '../../services/periodic-table.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [CommonModule, FilterInputComponent, MatTableModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  filteredElements$: Observable<PeriodicElement[]>;

  constructor(
    public state: RxState<PeriodicElementState>,
    private periodicTableService: PeriodicTableService
  ) {
    this.filteredElements$ = combineLatest([
      this.state.select('elements'),
      this.state.select('filter'),
    ]).pipe(map(([elements, filter]) => this.filterElements(filter)));
  }

  ngOnInit() {
    this.state.select().subscribe((state) => console.log(state));
  }

  private filterElements(filterText: string): PeriodicElement[] {
    return this.periodicTableService
      .getState()
      .elements.filter(
        (el) =>
          el.name.toLowerCase().includes(filterText.toLowerCase()) ||
          el.symbol.toLowerCase().includes(filterText.toLowerCase())
      );
  }
}
