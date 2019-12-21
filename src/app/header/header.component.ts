import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, keyframes, animate } from '@angular/animations'
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('alert', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *',[
        animate(1000, keyframes([
          style({
            transform:'translateX(-500px)',
            opacity: 0 ,
            offset: 0
          }),
          style({
            transform:'translateX(100px)',
            opacity: 1 ,
            offset: 0.75
          }),
          style({
            transform:'translateX(0)',
            opacity: 1 ,
            offset: 1
          }),
        ]))
      ]),
      transition('* => void',[
        animate(1000, keyframes([
          style({
            transform:'translateX(0px)',
            opacity: 1 ,
            offset: 0
          }),
          style({
            transform:'translateX(-200px)',
            opacity: 1 ,
            offset: 0.3
          }),
          style({
            transform:'translateX(300px)',
            opacity: 0 ,
            offset: 1
          }),
        ]))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  displayAlert: boolean;
  sub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.sub = this.store.select('homePage').pipe(
    take(2)
    ).subscribe(data => {
      this.displayAlert = data.displayMode;
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
