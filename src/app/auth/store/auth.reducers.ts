import { User } from '../user.modal';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  error: string;
  loading: boolean;
}

export function authReducer(
  state: State = { user: null, error: null, loading: false },
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTO_LOGIN: {
      return { ...state, loading: true };
    }
    case AuthActions.AUTO_LOGIN_FAIL: {
      return { ...state, loading: false };
    }
    case AuthActions.LOGIN_START: {
      return { ...state, error: null, loading: true };
    }
    case AuthActions.LOGIN: {
      const { email, id, token, expirationDate } = action.payload;
      const user = new User(email, id, token, expirationDate);
      localStorage.setItem('user', JSON.stringify(user));
      return { ...state, user, error: null, loading: false };
    }
    case AuthActions.LOGIN_FAIL: {
      return { ...state, user: null, error: action.payload, loading: false };
    }
    case AuthActions.LOGOUT: {
      localStorage.removeItem('user');
      return { ...state, user: null, loading: false };
    }
    default:
      return state;
  }
}
