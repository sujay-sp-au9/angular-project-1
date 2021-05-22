import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  constructor(public payload: { email; id; token; expirationDate }) {}
  readonly type = LOGIN;
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;
