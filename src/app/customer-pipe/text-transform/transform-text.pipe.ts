import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformText',
    standalone: true
})
export class TransformTextPipe implements PipeTransform {

    transform(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}
