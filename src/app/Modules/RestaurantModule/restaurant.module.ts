import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {RestaurantRouterModule} from "./restaurant-router.module";
import {RestaurantMainComponent} from './restaurant-main/restaurant-main.component';
import {MenuComponent} from './menu/menu.component';
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {RatingComponent} from "./rating/rating.component";
import {MatFormField, MatFormFieldModule, MatSuffix} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatInput} from "@angular/material/input";
import {TimePickerComponent} from "../Utils/time-picker/time-picker.component";
import {MatSelect} from "@angular/material/select";
import {DatePipe} from "@angular/common";
import {ReservationDialogComponent} from "./restaurant/reservation-dialog/reservation-dialog.component";
import {
  ReservationResponseDialogComponent
} from "./restaurant/reservation-response-dialog/reservation-response-dialog.component";
import {TimeFormatPipe} from "../Utils/time-format.pipe";
import {AppModule} from "../../app.module";
import {UtilsModule} from "../Utils/utils.module";

@NgModule({
  declarations: [
    RestaurantListComponent,
    RestaurantComponent,
    RestaurantMainComponent,
    MenuComponent,
    RatingComponent,
    ReservationDialogComponent,
    ReservationResponseDialogComponent
  ],
  imports: [
    BrowserModule,
    RestaurantRouterModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginator,
    MatSort,
    MatTable,
    MatProgressSpinner,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormField,
    MatInput,
    MatSuffix,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    UtilsModule
  ],
  providers: [DatePipe]
})
export class RestaurantModule {
}
