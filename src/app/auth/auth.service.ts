import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.modal';
import { environment } from '../../environments/environment';

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

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(private http: HttpClient, private router: Router) {}
  private handleError(err) {
    let error = 'An unknown error occurred';
    if (!err.error || !err.error.error || !err.error.error.message) {
      return throwError(error);
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
    return throwError(error);
  }
  private handleLogin(data) {
    const { email, localId, idToken, expiresIn } = data;
    const expirationDate = new Date(
      new Date().getTime() + Number(expiresIn) * 1000
    );
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/recipe']);
  }
  authenticate(email: string, password: string, confirmPassword?: string) {
    const dataObj = {
      email,
      password,
      returnSecureToken: true,
    };
    if (confirmPassword) {
      if (password !== confirmPassword) {
        return throwError("Passwords don't match");
      }
    }
    return this.http
      .post<AuthInterfaceData>(confirmPassword ? signupURL : signiURL, dataObj)
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(this.handleLogin.bind(this))
      );
  }
  autoLogin() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/auth']);
      return;
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
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.router.navigate(['/recipe']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
  logOut() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }
}
