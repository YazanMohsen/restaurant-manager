import {Component, Inject, OnInit} from '@angular/core';
import {TableService} from "../../../Services/table.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TableModel} from "../../../Models/table.model";
import {AuthService} from "../../../Services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './user-info-dialog.html',
  styleUrl: './user-info-dialog.css'
})
export class UserInfoDialog {
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<UserInfoDialog>,
  ) {
  }
  userInfo={
    customer_location:"",
    customer_phone_number:"",
  }

  startLoading() {
    this.isLoading = true;
    this.dialogRef.close(this.userInfo);

  }
}
