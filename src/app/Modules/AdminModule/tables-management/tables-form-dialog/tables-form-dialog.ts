import {Component, Inject, OnInit} from '@angular/core';
import {TableService} from "../../../Services/table.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TableModel} from "../../../Models/table.model";
import {AuthService} from "../../../Services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './tables-form-dialog.html',
  styleUrl: './tables-form-dialog.css'
})
export class TablesFormDialog {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private tableService: TableService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  table: TableModel = new TableModel(null, null, null, null, null);

  onSubmit() {
    this.table.restaurant_id = this.authService.getUser().restaurant_id;
    this.tableService.saveTable(this.table).subscribe(() => {
      this.toastr.success("", "Table Created Successfully");
      this.isLoading = false;
      this.dialog.closeAll();
    }, (error) => {
      this.toastr.error(error.message, "Failed to Create Table");
      this.isLoading = false;
      this.dialog.closeAll();
    })
  }

  startLoading() {
    this.isLoading = true;
    if(!this.table.number || !this.table.capacity|| this.table.capacity>20) {
      this.toastr.info( "Please Enter A Valid Table Number and Capacity","Invalid Data",);
      this.isLoading = false;
      return;
    }
    this.onSubmit();
  }
}
