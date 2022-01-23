import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value && !isNaN(value)) {
    const days = Math.floor(value / (1000 * 3600 * 24));
    const hours = Math.floor(value % (1000 * 3600 * 24) / (1000 * 3600) );
    const minutes = Math.floor(value % (1000 * 3600 * 24) % (1000 * 3600) / (1000 * 60));
    const seconds = Math.floor(value % (1000 * 3600 * 24) % (1000 * 3600) % (1000 * 60) / 1000);

    return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
    }
    return "n/a";
  }

}
