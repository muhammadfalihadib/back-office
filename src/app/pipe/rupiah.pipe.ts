import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiahCurency',
})
export class RupiahCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || isNaN(value)) {
      return '';
    }

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
}
