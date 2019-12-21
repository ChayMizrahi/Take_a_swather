import { Component, OnInit, Input } from '@angular/core';
import { LocationWeather } from '../../home-page/locationWeather.model';

@Component({
  selector: 'app-current-condition-card',
  templateUrl: './current-condition-card.component.html',
  styleUrls: ['./current-condition-card.component.css']
})
export class CurrentConditionCardComponent {

  @Input() location:LocationWeather;
  @Input() fullyName:boolean;

  constructor() { }
}
