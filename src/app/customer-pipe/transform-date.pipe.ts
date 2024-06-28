import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformDate',
    standalone: true
})
export class TransformDatePipe implements PipeTransform {

    transform(date: Date, format: string): string {
        return formatDate(date, format , 'fr-FR');
    }

}
