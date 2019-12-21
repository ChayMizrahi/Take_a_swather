import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as HomePageActions from './home-page.actions';
import { CurrentConditionsApiRes } from 'src/app/shared/apiResultes/CurrentConditionsApiRes';
import { state } from './home-page.reducer';
import { AutocompleteSearchApiRes } from 'src/app/shared/apiResultes/AutocompleteSearchApiRes';
import { LocationWeather, CurrentCondition } from '../locationWeather.model';
import { FiveDaysOfDailyForecastsApiRes } from 'src/app/shared/apiResultes/FiveDaysOfDailyForecastsApiRes';


@Injectable()
export class HomePageEffects {

    @Effect()
    fetchDemoMyLocation = this.actions$.pipe(
        ofType(HomePageActions.FETCH_DEMO_MY_LOCATION),
        switchMap((action) => {
            return this.http.get<CurrentConditionsApiRes[]>('./assets/jsons/currentConditions.json');
        }),
        map((ccs: CurrentConditionsApiRes[]) => {
            return ccs[0];
        }),
        map(cc => {
            return new HomePageActions.SetMyLocation(cc);
        }),
        catchError((err: HttpErrorResponse) => {
            return of(new HomePageActions.FetchDataFail(err.message));
        })
    );

    @Effect()
    fetchMyLocation = this.actions$.pipe(
        ofType(HomePageActions.FETCH_MY_LOCATION),
        switchMap((action: HomePageActions.FetchMyLocation) => {
            return this.http.get<CurrentConditionsApiRes[]>
            ('https://dataservice.accuweather.com/currentconditions/v1/'
                + action.payload);
        }),
        map((data: CurrentConditionsApiRes[]) => {
            return data[0];
        }),
        map((data: CurrentConditionsApiRes) => {
            return new HomePageActions.SetMyLocation(data);
        }),
        catchError((err: HttpErrorResponse) => {
            if (err.status === 0) {
                this.store$.dispatch(new HomePageActions.SwitchToDisplayMode())
                return of(new HomePageActions.FetchDemoMyLocation());
            } else {
                return of(new HomePageActions.FetchDataFail(err.message));
            }
        })
    );

    @Effect()
    fetchDemoAutocomplete = this.actions$.pipe(
        ofType(HomePageActions.FETCH_DEMO_AUTOCOMPLETE),
        switchMap((action) => {
            return this.http.get<AutocompleteSearchApiRes[]>(
                './assets/jsons/autoComplete.json')
        }),
        map((acs: AutocompleteSearchApiRes[]) => {
            return acs.map(
                (ac => {
                    return new LocationWeather(ac.LocalizedName, ac.Country.LocalizedName, ac.Key, ac.AdministrativeArea.LocalizedName);
                }))
        }),
        map((data) => {
            return new HomePageActions.SetAutocomplete(data);
        }),
        catchError((err: HttpErrorResponse) => {
            return of(new HomePageActions.FetchDataFail(err.message));
        })
    )

    @Effect()
    fetchAutocomplete = this.actions$.pipe(
        ofType(HomePageActions.FETCH_AUTOCOMPLETE),
        switchMap((action: HomePageActions.FetchAutocomplete) => {
            return this.http.get<AutocompleteSearchApiRes[]>(
                'https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=' + action.payload);
        }),
        map((acs: AutocompleteSearchApiRes[]) => {
            return acs.map(
                (ac => {
                    return new LocationWeather(ac.LocalizedName, ac.Country.LocalizedName, ac.Key, ac.AdministrativeArea.LocalizedName);
                }))
        }),
        map((data) => {
            return new HomePageActions.SetAutocomplete(data);
        }),
        catchError((err: HttpErrorResponse) => {
            if (err.status === 0) {
                this.store$.dispatch(new HomePageActions.SwitchToDisplayMode())
                return of(new HomePageActions.FetchDemoAutocomplete());
            } else {
                return of(new HomePageActions.FetchDataFail(err.message));
            }
        })
    );

    @Effect()
    fetchDemoSLCurrentCondition = this.actions$.pipe(
        ofType(HomePageActions.FETCH_DEMO_SL_CURRENT_CONDITION),
        switchMap((action: HomePageActions.FetchDemoSLCurrentConditions) => {
            return this.http.get<CurrentConditionsApiRes[]>('./assets/jsons/currentConditions.json');
        }),
        map((ccs: CurrentConditionsApiRes[]) => {
            const ccApi = ccs[0];
            const cc: CurrentCondition = new CurrentCondition(
                true,
                ccApi.WeatherText,
                ccApi.Temperature.Imperial.Value,
                ccApi.Temperature.Metric.Value,
                new Date(ccApi.LocalObservationDateTime),
                ccApi.WeatherIcon,
                ccApi.HasPrecipitation,
                ccApi.IsDayTime
            )
            return new HomePageActions.SetSLCurrentConditions(cc);
        }),
        catchError((err: HttpErrorResponse) => {
            return of(new HomePageActions.FetchDataFail(err.message));
        })
    )

    @Effect()
    fetchSLCurrentCondition = this.actions$.pipe(
        ofType(HomePageActions.FETCH_SL_CURRENT_CONDITION),
        switchMap((action: HomePageActions.FetchSLCurrentConditions) => {
            return this.http.get<CurrentConditionsApiRes[]>('https://dataservice.accuweather.com/currentconditions/v1/'
            + action.payload);
        }),
        map((ccs: CurrentConditionsApiRes[]) => {
            const ccApi = ccs[0];
            const cc: CurrentCondition = new CurrentCondition(
                true,
                ccApi.WeatherText,
                ccApi.Temperature.Imperial.Value,
                ccApi.Temperature.Metric.Value,
                new Date(ccApi.LocalObservationDateTime),
                ccApi.WeatherIcon,
                ccApi.HasPrecipitation,
                ccApi.IsDayTime
            )
            return new HomePageActions.SetSLCurrentConditions(cc);
        }),
        catchError((err: HttpErrorResponse) => {
            if (err.status === 0) {
                this.store$.dispatch(new HomePageActions.SwitchToDisplayMode())
                return of(new HomePageActions.FetchDemoSLCurrentConditions());
            } else {
                return of(new HomePageActions.FetchDataFail(err.message));
            }
        })
    )

    @Effect()
    fetchDemoFiveDaysForecases = this.actions$.pipe(
        ofType(HomePageActions.FETCH_DEMO_SL_FIVE_DAYS_FORECASES),
        switchMap((action: HomePageActions.FetchDemoSLFiveDaysForecases) => {
            return this.http.get<FiveDaysOfDailyForecastsApiRes>('./assets/jsons/weatherInfoForFiveDays.json');
        }),
        map((fd: FiveDaysOfDailyForecastsApiRes) => {
            return new HomePageActions.SetSLFiveDaysForecases(fd);
        }),
        catchError((err: HttpErrorResponse) => {
            return of(new HomePageActions.FetchDataFail(err.message));
        })
    )


    @Effect()
    fetchFiveDaysForecases = this.actions$.pipe(
        ofType(HomePageActions.FETCH_SL_FIVE_DAYS_FORECASES),
        switchMap((action: HomePageActions.FetchSLFiveDaysForecases) => {
            return this.http.get<FiveDaysOfDailyForecastsApiRes>('https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + action.payload + '?metric=true');
        }),
        map((fd: FiveDaysOfDailyForecastsApiRes) => {
            return new HomePageActions.SetSLFiveDaysForecases(fd);
        }),
        catchError((err: HttpErrorResponse) => {
            if (err.status === 0) {
                this.store$.dispatch(new HomePageActions.SwitchToDisplayMode())
                return of(new HomePageActions.FetchDemoSLFiveDaysForecases());
            } else {
                return of(new HomePageActions.FetchDataFail(err.message));
            }
        })
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store$: Store<state>) { }
}