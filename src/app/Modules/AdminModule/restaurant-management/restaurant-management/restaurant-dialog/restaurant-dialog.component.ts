import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({

  selector: 'app-restaurant-dialog',
  templateUrl: './restaurant-dialog.component.html',
  styleUrl: './restaurant-dialog.component.css'
})
export class RestaurantDialogComponent {
  credentials={
    email:"",
    password:"",
  }
  constructor(
    public dialogRef: MatDialogRef<RestaurantDialogComponent>,
  ) {}

  onClose(): void {
    this.dialogRef.close(this.credentials);
  }
}
