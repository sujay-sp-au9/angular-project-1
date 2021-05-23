import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  userSub: Subscription;
  @ViewChild('ReceiveClickFromButton') ReceiveClickFromButton: ElementRef<any>;
  propagateClickToUL() {
    this.ReceiveClickFromButton.nativeElement.click();
  }
  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.userSub = this.store.select('auth').subscribe(({ user }) => {
      this.loggedIn = !!user;
    });
  }
  saveData() {
    this.dataStorageService.storeRecipes();
  }
  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  logOut() {
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
