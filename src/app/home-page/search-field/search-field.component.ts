import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LocationWeather } from '../locationWeather.model';
import * as fromApp from '../../store/app.reducer';
import * as HomePageActions from '../store/home-page.actions';


@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit, OnDestroy {

  q: string;
  searchRes: LocationWeather[];
  error: string;
  displayMode: boolean;
  sub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.sub = this.store.select('homePage').subscribe((data) => {
      this.displayMode = data.displayMode;
      this.error = data.error;
      this.searchRes = data.autocompleteResulet;
    })
  }

  onSearch() {
    if (this.displayMode) {
      this.store.dispatch(new HomePageActions.FetchDemoAutocomplete);
    } else {
      this.store.dispatch(new HomePageActions.FetchAutocomplete(this.q));
    }
  }

  onSelectLoction(index: number) {
    const sl: LocationWeather = this.searchRes[index];
    this.store.dispatch(new HomePageActions.SetSelectedLocation(sl));
    if (this.displayMode) {
      this.store.dispatch(new HomePageActions.FetchDemoSLCurrentConditions());
      this.store.dispatch(new HomePageActions.FetchDemoSLFiveDaysForecases());
    } else {
      this.store.dispatch(new HomePageActions.FetchSLCurrentConditions(sl.key));
      this.store.dispatch(new HomePageActions.FetchSLFiveDaysForecases(sl.key));
    }
    this.onClear();
  }

  onChangeInput(){
    if(this.searchRes){
        this.store.dispatch(new HomePageActions.ClearAutocomplete());
    }
  }

  onClear() {
    this.q = '';
    this.store.dispatch(new HomePageActions.ClearAutocomplete());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
