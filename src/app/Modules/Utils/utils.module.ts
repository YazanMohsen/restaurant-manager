import {NgModule} from '@angular/core';
import {TimePickerComponent} from "./time-picker/time-picker.component";
import {TimeFormatPipe} from "./time-format.pipe";
import {BrowserModule} from "@angular/platform-browser";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

@NgModule({
  declarations: [TimePickerComponent,TimeFormatPipe],
  imports: [BrowserModule, MatFormField, MatLabel, MatSelect, MatOption],
  exports:  [TimePickerComponent,TimeFormatPipe],
})
export class UtilsModule {
}
