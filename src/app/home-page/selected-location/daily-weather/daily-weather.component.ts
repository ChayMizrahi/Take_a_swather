import { Component, Input } from '@angular/core';

import { DailyForecast } from '../../locationWeather.model';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css']
})
export class DailyWeatherComponent {
  @Input() dayWeather: DailyForecast;
  constructor() { }
}
