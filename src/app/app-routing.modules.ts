import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./recipe/recipes-routing.module').then(
        (m) => m.RecipesRoutingModule
      ),
  },
  {
    path: 'shopping',
    loadChildren: () =>
      import('./shopping/shopping-routing.module').then(
        (m) => m.ShoppingRoutingModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
