import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'celToFar'
})
export class CelToFar implements PipeTransform {
    transform(value){
        let f:number = (value * 9 / 5 + 32);
        return Number(f.toFixed(0));
    }
}