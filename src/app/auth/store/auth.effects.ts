import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.modal';

const signupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.api_key}`;
const signiURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.api_key}`;

interface AuthInterfaceData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
  autoAuthLogin = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      switchMap(() => {
        const user = localStorage.getItem('user');
        if (!user) {
          this.router.navigate(['/auth']);
          return of(new AuthActions.AutoLoginFail());
        }
        const {
          email,
          id,
          _token,
          _tokenExpirationDate,
        }: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(user);
        const loadedUser = new User(
          email,
          id,
          _token,
          new Date(_tokenExpirationDate)
        );
        if (loadedUser && loadedUser.token) {
          return of(
            new AuthActions.Login({
              email,
              id,
              token: _token,
              expirationDate: new Date(_tokenExpirationDate),
            })
          );
        } else {
          this.router.navigate(['/auth']);
          return of(new AuthActions.AutoLoginFail());
        }
      })
    )
  );
  authLogin = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        const { email, password, confirmPassword } = authData.payload;
        if (confirmPassword) {
          if (password !== confirmPassword) {
            return of(new AuthActions.LoginFailed("Passwords don't match"));
          }
        }
        const dataObj = {
          email,
          password,
          returnSecureToken: true,
        };
        return this.http
          .post<AuthInterfaceData>(
            confirmPassword ? signupURL : signiURL,
            dataObj
          )
          .pipe(
            map(
              ({ email, localId, idToken, expiresIn }) =>
                new AuthActions.Login({
                  email,
                  id: localId,
                  token: idToken,
                  expirationDate: new Date(
                    new Date().getTime() + Number(expiresIn) * 1000
                  ),
                })
            ),
            catchError((err) => {
              let error = 'An unknown error occurred';
              if (!err.error || !err.error.error || !err.error.error.message) {
                return of(new AuthActions.LoginFailed(error));
              }
              const {
                error: {
                  error: { message },
                },
              } = err;
              switch (message) {
                case 'EMAIL_EXISTS':
                  error = 'This email already exists';
                case 'INVALID_PASSWORD':
                case 'USER_NOT_FOUND':
                  error = 'Incorrect username/password';
              }
              return of(new AuthActions.LoginFailed(error));
            })
          );
      })
    )
  );
  authSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
          this.router.navigate(['/recipe']);
        })
      ),
    { dispatch: false }
  );
  authLogout = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
