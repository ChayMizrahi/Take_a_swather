import { Action } from '@ngrx/store'

import { CurrentConditionsApiRes } from 'src/app/shared/apiResultes/CurrentConditionsApiRes';
import { LocationWeather, CurrentCondition } from '../locationWeather.model';
import { FiveDaysOfDailyForecastsApiRes } from 'src/app/shared/apiResultes/FiveDaysOfDailyForecastsApiRes';

export const FETCH_DEMO_MY_LOCATION = "[HomePage] Fetch Demo My Location";
export const FETCH_MY_LOCATION = "[HomePage] Fetch My Location";
export const SET_MY_LOCATION = "[HomePage] Set My Location";

export const FETCH_DEMO_AUTOCOMPLETE = "[HomePage] Fetch Demo Autocomplete";
export const FETCH_AUTOCOMPLETE = "[HomePage] Fetch Autocomplete";
export const SET_AUTOCOMPLETE = "[HomePage] Set Autocomplete";

//export const FETCH_DEMO_SL = "[HomePage] Fetch Demo Selected Location"
//export const FETCH_SL = "[HomePage] Fetch Selected Location"
export const SET_SELECTED_LOCATION = "[HomePage] Set Selected Location";

export const FETCH_SL_CURRENT_CONDITION = "[HomePage] Fetch Selected Location Current Condition";
export const FETCH_DEMO_SL_CURRENT_CONDITION = "[HomePage] Fetch Demo Selected Location Current Condition";
export const SET_SL_CURRENT_CONDITIONS = '[HomePage] Set Selected Location Current Conditins';

export const FETCH_SL_FIVE_DAYS_FORECASES = "[HomePage] Fetch Selected Location Five Days Forecases";
export const FETCH_DEMO_SL_FIVE_DAYS_FORECASES = "[HomePage] Fetch Demo Selected Location Five Days Forecases";
export const SET_SL_FIVE_DAYS_FORECASES = '[HomePage] Set Selected Location Five Days Forecases';

export const CLEAR_AUTOCOMPLETE = "[HomePage] Clear Autocomplete";
export const SWITCH_TO_DISPLAY_MODE = "[HomePage] Switch To Display Mode";
export const FETCH_DATA_FAIL = "[HomePage] Fetch Data Fail";
export const HANDEL_ERROR = "[HomePage] Handel Error";


export class FetchDemoMyLocation implements Action {
    readonly type = FETCH_DEMO_MY_LOCATION;
}

export class FetchMyLocation implements Action {
    readonly type = FETCH_MY_LOCATION;
    constructor(public payload: string) { }
}

export class SetMyLocation implements Action {
    readonly type = SET_MY_LOCATION;
    constructor(public payload: CurrentConditionsApiRes) { }
}

export class FetchDemoAutocomplete implements Action {
    readonly type = FETCH_DEMO_AUTOCOMPLETE;
}

export class FetchAutocomplete implements Action {
    readonly type = FETCH_AUTOCOMPLETE;
    constructor(public payload: string) { }
}

/*export class FetchDemoSelectedLocation implements Action {
    readonly type = FETCH_DEMO_SL;
    constructor(public payload: LocationWeather) { };
}*/

export class FetchDemoSLCurrentConditions implements Action {
    readonly type = FETCH_DEMO_SL_CURRENT_CONDITION;
}

export class FetchSLCurrentConditions implements Action {
    readonly type = FETCH_SL_CURRENT_CONDITION;
    constructor(public payload: string) { }
}

export class SetSLCurrentConditions implements Action {
    readonly type = SET_SL_CURRENT_CONDITIONS;
    constructor(public payload: CurrentCondition) { }
}

export class FetchDemoSLFiveDaysForecases implements Action {
    readonly type = FETCH_DEMO_SL_FIVE_DAYS_FORECASES;
}

export class FetchSLFiveDaysForecases implements Action {
    readonly type = FETCH_SL_FIVE_DAYS_FORECASES;
    constructor(public payload: string) { }
}

export class SetSLFiveDaysForecases implements Action {
    readonly type = SET_SL_FIVE_DAYS_FORECASES;
    constructor(public payload:FiveDaysOfDailyForecastsApiRes) { }
}

/*export class FetchSelectedLocation implements Action {
    readonly type = FETCH_SL;
    constructor(public payload: LocationWeather) { };
}*/

export class SetAutocomplete implements Action {
    readonly type = SET_AUTOCOMPLETE;
    constructor(public payload: LocationWeather[]) { }
}

export class SetSelectedLocation implements Action {
    readonly type = SET_SELECTED_LOCATION;
    constructor(public payload: LocationWeather) { }
}

export class ClearAutocomplete implements Action {
    readonly type = CLEAR_AUTOCOMPLETE;
}

export class SwitchToDisplayMode implements Action {
    readonly type = SWITCH_TO_DISPLAY_MODE;
}

export class FetchDataFail implements Action {
    readonly type = FETCH_DATA_FAIL;
    constructor(public payload: string) { }
}

export class HandelError implements Action {
    readonly type = HANDEL_ERROR;
}

export type homePageActions =
    FetchDemoMyLocation
    | FetchMyLocation
    | SetMyLocation
    | SwitchToDisplayMode
    | FetchDataFail
    | HandelError
    | FetchAutocomplete
    | FetchDemoAutocomplete
    | SetAutocomplete
    | SetSelectedLocation
    | ClearAutocomplete
    //| FetchSelectedLocation
    //| FetchDemoSelectedLocation
    | SetSLCurrentConditions
    | FetchDemoSLFiveDaysForecases
    | FetchSLFiveDaysForecases
    | SetSLFiveDaysForecases
    ;