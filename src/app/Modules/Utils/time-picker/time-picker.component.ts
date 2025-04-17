import {Component, EventEmitter, Output} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  times: {}[] = [];

  constructor() {
    const amTimes: {}[] = [];

    const pmTimes: {}[] = [];

    // Generate AM times first with 30-minute intervals
    for (let hour = 1; hour <= 12; hour++) {
      amTimes.push({time: `${hour}:00 AM`, value: `${hour}:00`});
      amTimes.push({time: `${hour}:30 AM`, value: `${hour}:30`});
    }

    // Generate PM times next with 30-minute intervals
    for (let hour = 1; hour <= 12; hour++) {
      let hourValue = hour + 12;
      if (hourValue == 24) hourValue = 0;
      pmTimes.push({time: `${hour}:00 PM`, value: `${hourValue}:00`});
      pmTimes.push({time: `${hour}:30 PM`, value: `${hourValue}:30`});
    }

    // Merge AM and PM times in the correct order
    this.times = [...amTimes, ...pmTimes];
  }

  selectedTime: string | null = null;
  @Output() selectedTimeEmitter: EventEmitter<string> = new EventEmitter<string>();

  onTimeSelected($event: MatSelectChange) {
    this.selectedTimeEmitter.emit($event.value);
  }
}
