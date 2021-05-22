import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

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
    private authServiceA: AuthService,
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
    this.authServiceA.logOut();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
