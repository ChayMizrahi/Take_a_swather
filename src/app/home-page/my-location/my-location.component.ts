import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LocationWeather } from '../locationWeather.model';
import * as fromApp from '../../store/app.reducer'
import * as HomePageActions from '../store/home-page.actions';

@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrls: ['./my-location.component.css']
})
export class MyLocationComponent implements OnInit, OnDestroy {

  myLocation: LocationWeather;
  error: string;
  sub: Subscription;
  displayMode: boolean;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.sub = this.store.select('homePage').pipe(
      take(1)
    ).subscribe((data) => {
      this.error = data.error;
      this.displayMode = data.displayMode;
      this.myLocation = data.myLocation;
      if(!this.myLocation.currentCondition){
        this.setCurrentCondition(this.myLocation.key);
      }
    })
  }

  setCurrentCondition(key: string) {
    if (this.displayMode) {
      this.store.dispatch(new HomePageActions.FetchDemoMyLocation());
    } else {
      this.store.dispatch(new HomePageActions.FetchMyLocation(key));
    }
  }

  onClose() {
    this.store.dispatch(new HomePageActions.HandelError());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
