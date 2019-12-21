import { LocationWeather, CurrentCondition } from '../locationWeather.model';
import * as HomePageActions from './home-page.actions'

export interface state {
    myLocation: LocationWeather;
    error: string;
    autocompleteResulet: LocationWeather[];
    selectedLocation: LocationWeather;
    displayMode: boolean;
}

const initialState = {
    myLocation: new LocationWeather('Tel Aviv', 'Israel', '215854', 'Tel Aviv'),
    error: null,
    autocompleteResulet: null,
    selectedLocation: null,
    displayMode: false
}

export function homePageReducer(state = initialState, action: HomePageActions.homePageActions) {

    switch (action.type) {
        case HomePageActions.SET_MY_LOCATION:
            const mLoction: LocationWeather = state.myLocation;
            mLoction.setCurrentCondition(action.payload);
            return {
                ...state,
                myLocation: mLoction
            };
        case HomePageActions.SET_AUTOCOMPLETE:
            return {
                ...state,
                autocompleteResulet: action.payload
            };
        case HomePageActions.SET_SELECTED_LOCATION:
            return {
                ...state,
                selectedLocation: action.payload
            };
        case HomePageActions.SET_SL_CURRENT_CONDITIONS:
            const sl:LocationWeather = state.selectedLocation;
            sl.currentCondition = action.payload;
            return {
                ...state,
                selectedLocation: sl
            };
        case HomePageActions.SET_SL_FIVE_DAYS_FORECASES:
            const slt:LocationWeather = state.selectedLocation;
            slt.setFiveDayForecasts(action.payload);
            return {
                ...state,
                selectedLocation: slt
            }
        case HomePageActions.CLEAR_AUTOCOMPLETE:
            return {
                ...state,
                autocompleteResulet: null
            }

        case HomePageActions.SWITCH_TO_DISPLAY_MODE:
            return {
                ...state,
                displayMode: true
            };
        case HomePageActions.FETCH_DATA_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case HomePageActions.HANDEL_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}