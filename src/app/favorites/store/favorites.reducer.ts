import { LocationWeather } from 'src/app/home-page/locationWeather.model';
import * as FavoritesActions from "./favorites.actions";

export interface state {
    favoritesLocations: LocationWeather[];
}

const initialState = {
    favoritesLocations: []
}

export function favoritesReducer(state = initialState, action: FavoritesActions.FavoritesActions) {
    switch (action.type) {
        case FavoritesActions.ADD_TO_FAVORITES:
            const fav = [...state.favoritesLocations, action.payload];
            return {
                ...state,
                favoritesLocations: fav
            };

        case FavoritesActions.REMOVE_FROM_FAVORITES:
            const newArray = state.favoritesLocations.filter((location: LocationWeather) => {
                if (location.key !== action.payload) {
                    return location.key !== action.payload;
                }
            });
            return {
                ...state,
                favoritesLocations: newArray
            }


        default:
            return state
    }
}
