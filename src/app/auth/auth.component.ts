import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertComponent } from '../shared/alert/alert.component';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode: boolean = true;
  loginModeEvent: Subject<boolean>;
  form: FormGroup;
  loading: boolean = false;
  loginSub: Subscription;
  private errorCloseSub: Subscription;
  @ViewChild('containerToHostDynamicallyInjectedComponents', {
    read: ViewContainerRef,
  })
  errorContainer: ViewContainerRef;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    this.loginModeEvent = new Subject();
    this.loginModeEvent.next(true);
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.loginModeEvent.subscribe((mode) => {
      this.loginMode = mode;
      if (mode) {
        this.form.removeControl('confirmPassword');
      } else {
        this.form.addControl(
          'confirmPassword',
          new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            (confirmPasswordForm: FormControl) => {
              if (
                this.form.controls.password.value === confirmPasswordForm.value
              ) {
                return null;
              }
              return { unmatched: true };
            },
          ])
        );
      }
    });
    this.loginSub = this.store
      .select('auth')
      .subscribe(({ error, loading }) => {
        this.loading = loading;
        if (error) {
          this.showError(error);
        }
      });
  }
  onSwitchMode() {
    this.loginModeEvent.next(!this.loginMode);
  }
  onSubmit() {
    if (this.form.valid) {
      const { email, password, confirmPassword } = this.form.value;
      this.store.dispatch(
        new AuthActions.LoginStart({ email, password, confirmPassword })
      );
      this.form.reset();
    } else {
      return;
    }
  }
  private showError(message) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.errorContainer;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.message = message;
    this.errorCloseSub = componentRef.instance.close
      .pipe(take(1))
      .subscribe(() => {
        hostViewContainerRef.clear();
      });
  }
  errorRead() {}
  ngOnDestroy() {
    if (this.errorCloseSub) {
      this.errorCloseSub.unsubscribe();
    }
    this.loginModeEvent.unsubscribe();
    this.loginSub.unsubscribe();
  }
}
