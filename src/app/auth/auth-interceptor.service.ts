import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      exhaustMap(({ user }) => {
        if (!user) {
          return next.handle(req);
        } else if (!user.token) {
          return next.handle(req);
        }
        return next.handle(
          req.clone({
            params: new HttpParams().set('auth', user.token),
          })
        );
      })
    );
  }
}
