import { Component } from '@angular/core';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { PeriodicElementState } from '../../models/periodic-element-state';
import { PeriodicElement } from '../../models/periodic-element';
import { map, Observable, tap } from 'rxjs';
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
  filteredElements$: Observable<PeriodicElement[]> | undefined;

  constructor(
    private periodicTableService: PeriodicTableService
  ) {}

  ngOnInit() {
    this.filteredElements$ = this.periodicTableService.selectState().pipe(
      tap((state) => console.log(state)), // DEBUG
      map((state: PeriodicElementState) => this.filterElements(state.filter))
    );
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
