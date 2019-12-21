import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { trigger, transition, style, animate } from '@angular/animations';

import { LocationWeather } from '../locationWeather.model';
import * as fromApp from '../../store/app.reducer';
import * as FavoritesActions from '../../favorites/store/favorites.actions';



@Component({
  selector: 'app-selected-location',
  templateUrl: './selected-location.component.html',
  styleUrls: ['./selected-location.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(50%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(50%)' }))
      ])
    ])
  ]
})
export class SelectedLocationComponent implements OnInit, OnDestroy {

  selectedLocation: LocationWeather;
  favoritesList: LocationWeather[];
  message: string;
  subHomePage: Subscription;
  subFavorites: Subscription;
  info: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subFavorites = this.store.select("favorites").pipe(
    ).subscribe((data) => {
      this.favoritesList = data.favoritesLocations;
    });

    this.subHomePage = this.store.select("homePage").pipe(
    ).subscribe((data) => {
      this.selectedLocation = data.selectedLocation;
    });
  }

  onAddToFavor() {
    if(!this.isFavorites()){
      this.store.dispatch(new FavoritesActions.AddToFavorites(this.selectedLocation));
      this.message = this.selectedLocation.name + ' is a favorite';
      this.info = false;
    }
    
  }

  onRemoveFromFavor() {
    this.store.dispatch(new FavoritesActions.RemoveFromFavorites(this.selectedLocation.key));
    this.message = this.selectedLocation.name + ' is not a favorite';
    this.info = false;
  }

  isFavorites() {
    const theList = this.favoritesList;
    const l = theList.find(l => { return l.key === this.selectedLocation.key });
    return l === undefined ? false : true;
  }

  onClose() {
    this.message = null;
  }

  onMouseOn() {
    this.info = true;
  }

  onMouseLaeve() {
    this.info = false;
  }

  ngOnDestroy() {
    this.subHomePage.unsubscribe();
    this.subFavorites.unsubscribe();
  }

}
