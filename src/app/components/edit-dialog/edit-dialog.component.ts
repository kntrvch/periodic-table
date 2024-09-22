import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../models/periodic-element';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [MatInputModule, MatDialogModule, FormsModule, MatButtonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { element: PeriodicElement }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
