import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer'
import {environment} from '../../environments/environment'



@Injectable()
export class AccuInterceptor implements HttpInterceptor {

    displayMode: boolean;

    constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.store.select('homePage').subscribe(data => {
            this.displayMode = data.displayMode;
        })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.displayMode) {
            const modifePath = req.clone({params: new HttpParams().set('apikey', environment.AccuWeatherApiKey)})
            return next.handle(modifePath);
        } else {
            return next.handle(req)
        }
    }


}