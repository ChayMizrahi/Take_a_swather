import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { LocationWeather } from '../home-page/locationWeather.model';
import * as fromApp from '../store/app.reducer';
import * as HomePageActions from '../home-page/store/home-page.actions';
import * as FavoritesActions from './store/favorites.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  faveritesList: LocationWeather[];
  displayMode: boolean;
  subFaver: Subscription;
  message:string;
  subHomePage: Subscription;

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subFaver = this.store.select('favorites').subscribe(fl => {
      this.faveritesList = fl.favoritesLocations;
    });
    this.subHomePage = this.store.select('homePage').subscribe(data => {
      this.displayMode = data.displayMode;
    });
  }

  onUnfaveritrs(key: string, name:string) {
    this.store.dispatch(new FavoritesActions.RemoveFromFavorites(key));
    this.message = name+' removed from favorites list.';
  }

  onClose(){
    this.message = null;
  }

  onSelect(location: LocationWeather) {
    this.store.dispatch(new HomePageActions.SetSelectedLocation(location));
    if (this.displayMode) {
      this.store.dispatch(new HomePageActions.FetchDemoSLCurrentConditions());
      this.store.dispatch(new HomePageActions.FetchDemoSLFiveDaysForecases());
    } else {
      this.store.dispatch(new HomePageActions.FetchSLCurrentConditions(location.key));
      this.store.dispatch(new HomePageActions.FetchSLFiveDaysForecases(location.key));
    }
    this.onMoveHome();
  }

  onMoveHome(){
    this.store.dispatch(new FavoritesActions.RedirectToHomePage());
  }

  ngOnDestroy() {
    this.subFaver.unsubscribe();
    this.subHomePage.unsubscribe();
  }

}
