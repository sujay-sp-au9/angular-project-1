import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipesModule } from './recipe/recipes.module';
import { ShoppingModule } from './shopping/shopping.module';
import { DirectivesModule } from './shared/directives.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingRoutingModule } from './shopping/shopping-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AppRoutingModule } from './app-routing.modules';
import { StoreModule } from '@ngrx/store';
import { shoppingReducer } from './shopping/shopping.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShoppingRoutingModule,
    AuthRoutingModule,
    HttpClientModule,
    AuthModule,
    RecipesModule,
    ShoppingModule,
    DirectivesModule,
    StoreModule.forRoot({ shopping: shoppingReducer }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
