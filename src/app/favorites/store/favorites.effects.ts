import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as FavoriresActions from "../store/favorites.actions";

@Injectable()
export class FavoritesEffects {

    @Effect({ dispatch: false })
    redirectToHomePage = this.actions$.pipe(
        ofType(FavoriresActions.REDIRECT_TO_HOME_PAGE),
        tap((action:FavoriresActions.RedirectToHomePage) => {
            this.router.navigate(['/']);
        })
    )

    constructor(private actions$:Actions, private router:Router){}
}