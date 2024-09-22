import { Component } from '@angular/core';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { PeriodicElementState } from '../../models/periodic-element-state';
import { PeriodicElement } from '../../models/periodic-element';
import { map, Observable, tap } from 'rxjs';
import { PeriodicTableService } from '../../services/periodic-table.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [CommonModule, FilterInputComponent, MatTableModule, MatButtonModule],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  filteredElements$: Observable<PeriodicElement[]> | undefined;

  constructor(
    private periodicTableService: PeriodicTableService,
    public dialog: MatDialog
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

  editElement(element: PeriodicElement) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { element: { ...element } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateElement(result);
      }
    });
  }

  private updateElement(updatedElement: PeriodicElement) {
    this.periodicTableService.setState({
      elements: this.periodicTableService
        .getState()
        .elements.map((el) =>
          el.position === updatedElement.position ? { ...updatedElement } : el
        ),
      filter: this.periodicTableService.getState().filter,
    });
  }
}
