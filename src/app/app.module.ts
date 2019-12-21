import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyLocationComponent } from './home-page/my-location/my-location.component';
import { SearchFieldComponent } from './home-page/search-field/search-field.component';
import { SelectedLocationComponent } from './home-page/selected-location/selected-location.component';
import { AlertComponent } from './shared/alert/alert.component';
import { CurrentConditionCardComponent } from './shared/current-condition-card/current-condition-card.component';
import { DailyWeatherComponent } from './home-page/selected-location/daily-weather/daily-weather.component';
import { StringToImg } from './shared/stringToImg.pipe';
import { CelToFar } from './shared/celToFar.pipe';
import { AccuInterceptor } from './shared/accuInterceptor.service';
import {  StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer'
import { HomePageEffects } from './home-page/store/home-page.effects';
import { FavoritesEffects } from './favorites/store/favorites.effects';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MyLocationComponent,
    SearchFieldComponent,
    SelectedLocationComponent,
    DailyWeatherComponent,
    HeaderComponent,
    FavoritesComponent,
    AlertComponent,
    CurrentConditionCardComponent,
    StringToImg,
    CelToFar,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([HomePageEffects, FavoritesEffects])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AccuInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
