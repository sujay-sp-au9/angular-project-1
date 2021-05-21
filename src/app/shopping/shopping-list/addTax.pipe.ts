import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addtax' })
export class AddTaxPipe implements PipeTransform {
  transform(value: any) {
    value = Number(value);
    return (value += value * 0.1);
  }
}
