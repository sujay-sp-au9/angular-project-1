import { User } from '../user.modal';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

export function authReducer(
  state: State = { user: null },
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const { email, id, token, expirationDate } = action.payload;
      const user = new User(email, id, token, expirationDate);
      return { ...state, user };
    case AuthActions.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}
