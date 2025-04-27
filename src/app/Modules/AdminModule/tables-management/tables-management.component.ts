import {Component} from '@angular/core';
import {TableModel} from "../../Models/table.model";
import {PageEvent} from "@angular/material/paginator";
import {ResponseModel} from "../../Models/response.model";
import {AuthService} from "../../Services/auth.service";
import {ToastrService} from "ngx-toastr";
import {TableService} from "../../Services/table.service";
import {ActivatedRoute} from "@angular/router";
import {TablesFormDialog} from "./tables-form-dialog/tables-form-dialog";
import {MatDialog} from "@angular/material/dialog";
import {
  themeBalham,
  themeMaterial, themeQuartz,
} from "ag-grid-enterprise";
import {ReservationService} from "../../Services/reservation.service";
import {ReservationModel} from "../../Models/reservation.model";

@Component({
  selector: 'app-tables-management',
  templateUrl: './tables-management.component.html',
  styleUrl: './tables-management.component.css'
})
export class TablesManagementComponent {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute,
    private tableService: TableService,) {
  }


  ngOnInit(): void {
    this.search(0, this.pageSize)
  }


  tables: TableModel[] = [];
  isLoading: boolean = false;
  totalCount: number;
  pageSize: number = 5;

  currentPage:number;
  paginate(event: PageEvent) {
    this.currentPage=event.pageIndex;

    this.search(event.pageIndex, event.pageSize);

  }

  search(page?: number, pageSize?: number) {
    this.isLoading = true;
    this.tableService.searchTables(page, pageSize, this.authService.getUser().restaurant_id).subscribe(
      (response: ResponseModel<TableModel>) => {
        this.isLoading = false;
        this.tables = response.list;
        this.totalCount = response.total_count;
      }
      , (error) => {
        this.toastr.error(error.message, "Failed to Fetch Tables");
        this.isLoading = false;
      }
    )
  }

  table: TableModel = new TableModel(null, null, null, null, null);

  openFormDialog() {
    const dialog = this.dialog.open(TablesFormDialog, {
      width: '450px',
      height: '300px',
    });
    dialog.afterClosed().subscribe(
      () => {
        this.search(this.currentPage, this.pageSize)
      }
    )
  }



  columnDefs = [
    {field: 'number',headerName: 'Table Number'},
    {field: 'capacity',headerName: 'Table Capacity'},
    {field: 'expand', cellRenderer: 'agGroupCellRenderer', headerName: 'Reservations'}
  ];
  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [
        {field: 'user.name',headerName: 'Client'},
        {field: 'date', headerName: 'Date'},
        {field: 'start_time',headerName: 'Start Time'},
        {field: 'end_time',headerName: 'End Time'},
        {field: 'status',headerName: 'Status'},
      ],
      defaultColDef: {flex: 1}
    },
    getDetailRowData: (params: any) => {
      this.reservationService.reservationsByTableId(null, null, params.data.id).subscribe(
        (response: ResponseModel<ReservationModel>) => {

          params.successCallback(response.list);
        }
      )
    }
  };
  protected readonly themeMaterial = themeMaterial;
}
