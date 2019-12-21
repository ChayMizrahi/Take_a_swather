import { ActionReducerMap } from '@ngrx/store'

import * as fromHomePage from '../home-page/store/home-page.reducer';
import * as fromFavorits from '../favorites/store/favorites.reducer';

export interface AppState {
    homePage: fromHomePage.state;
    favorites: fromFavorits.state;
}

export const appReducer: ActionReducerMap<AppState> = {
    homePage: fromHomePage.homePageReducer,
    favorites: fromFavorits.favoritesReducer
};