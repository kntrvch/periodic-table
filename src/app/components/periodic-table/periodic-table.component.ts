import { Component } from '@angular/core';
import { FilterInputComponent } from '../filter-input/filter-input.component';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [FilterInputComponent],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})
export class PeriodicTableComponent {

}
