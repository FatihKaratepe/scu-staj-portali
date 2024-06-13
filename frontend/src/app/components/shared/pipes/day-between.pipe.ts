import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dayBetween'
})
export class DayBetweenPipe implements PipeTransform {

  transform(date1: string, date2: string, isSixDay: boolean): string {
    let current = moment(date2);
    const end = moment(date1);
    let result = [];
    while (current <= end) {
      const dayOfWeek = current.day();
      if (isSixDay && dayOfWeek !== 0) {
        result.push(current.format('YYYY-MM-DD'));
      } else if (!isSixDay && dayOfWeek >= 1 && dayOfWeek <= 5) {
        result.push(current.format('YYYY-MM-DD'));
      }
      current.add(1, 'day');
    }
    return (result.length).toString();
  }

}
