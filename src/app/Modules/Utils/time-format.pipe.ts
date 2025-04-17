import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const [hour, minute] = value.split(':').map(Number);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 in 12-hour format

    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${suffix}`;
  }
}
