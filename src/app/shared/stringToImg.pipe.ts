import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'stringToImg'
})
export class StringToImg implements PipeTransform {
    transform(value: string) {
        if(+value>9){
            return 'https://developer.accuweather.com/sites/default/files/' + value + '-s.png'
        }else{
            return 'https://developer.accuweather.com/sites/default/files/0' + value + '-s.png'
        }
    }
}
