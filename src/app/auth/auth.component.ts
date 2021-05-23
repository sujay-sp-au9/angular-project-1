import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginModeEvent: Subject<boolean>;
  loginMode: boolean = true;
  form: FormGroup;
  loading: boolean = false;
  private errorCloseSub: Subscription;
  @ViewChild('containerToHostDynamicallyInjectedComponents', {
    read: ViewContainerRef,
  })
  errorContainer: ViewContainerRef;
  constructor(
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver
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
  }
  onSwitchMode() {
    this.loginModeEvent.next(!this.loginMode);
  }
  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const { email, password, confirmPassword } = this.form.value;
      this.authService.authenticate(email, password, confirmPassword).subscribe(
        (data) => {
          this.form.reset();
          console.log(data);
          this.loading = false;
        },
        (err) => {
          this.showError(err);
          this.form.reset();
          this.loading = false;
        }
      );
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
  }
}
