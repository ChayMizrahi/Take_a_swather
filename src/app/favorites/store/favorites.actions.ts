import { Action } from '@ngrx/store'
import { LocationWeather } from 'src/app/home-page/locationWeather.model';

export const ADD_TO_FAVORITES = "[Favorites] Add To Favorites";
export const REMOVE_FROM_FAVORITES = "[Favorites] Remove From Favorites";
export const REDIRECT_TO_HOME_PAGE = "[Favorites] Redirect To Home Page";

export class AddToFavorites implements Action{
    readonly type = ADD_TO_FAVORITES;
    constructor(public payload:LocationWeather){};
}

export class RemoveFromFavorites implements Action{
    readonly type = REMOVE_FROM_FAVORITES;
    constructor(public payload:string){}
}

export class RedirectToHomePage implements Action{
    readonly type = REDIRECT_TO_HOME_PAGE;
}

export type FavoritesActions = AddToFavorites | RemoveFromFavorites | RedirectToHomePage;