import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  logoutTimerID = null;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.store.select('auth').subscribe(({ user }) => {
      if (user) {
        this.logoutTimerID = setTimeout(
          () => this.store.dispatch(new AuthActions.Logout()),
          user.tokenExpirationDate.getTime() - Date.now()
        );
      }
    });
  }
  ngOnDestroy() {
    if (this.logoutTimerID) {
      clearTimeout(this.logoutTimerID);
    }
  }
}
