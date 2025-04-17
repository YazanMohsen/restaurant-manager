import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../Services/auth.service";

@Component({
  selector: 'app-reservation-response-dialog',
  templateUrl: './reservation-response-dialog.component.html',
  styleUrl: './reservation-response-dialog.component.css'
})
export class ReservationResponseDialogComponent {

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService) {

  }

  getUserName() {
    return this.authService.getUser().name;
  }

  Done() {
    this.dialog.closeAll();
  }
}
