import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { debounceTime } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PeriodicElementState } from '../../models/periodic-element-state';
import { PeriodicTableService } from '../../services/periodic-table.service';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.scss',
})
export class FilterInputComponent implements OnInit {
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private state: RxState<PeriodicElementState>,
    private periodicTableService: PeriodicTableService
  ) {
    this.filterForm = this.fb.group({
      filter: [''],
    });
  }

  ngOnInit() {
    this.periodicTableService.connectFilter(
      this.filterForm.get('filter')!.valueChanges
    );
  }

  clearFilter() {
    this.filterForm.controls['filter'].setValue('');
  }
}
