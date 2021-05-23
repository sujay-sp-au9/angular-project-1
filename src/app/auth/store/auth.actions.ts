import { Action } from '@ngrx/store';

export const AUTO_LOGIN = 'AUTO_LOGIN';
export const AUTO_LOGIN_FAIL = 'AUTO_LOGIN_FAIL';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
export class AutoLoginFail implements Action {
  readonly type = AUTO_LOGIN_FAIL;
}
export class LoginStart implements Action {
  constructor(
    public payload: {
      email: string;
      password: string;
      confirmPassword?: string;
    }
  ) {}
  readonly type = LOGIN_START;
}
export class Login implements Action {
  constructor(
    public payload: {
      email: string;
      id: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
  readonly type = LOGIN;
}
export class LoginFailed implements Action {
  constructor(public payload: string) {}
  readonly type = LOGIN_FAIL;
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions =
  | Login
  | Logout
  | LoginStart
  | LoginFailed
  | AutoLogin
  | AutoLoginFail;
