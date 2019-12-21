import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'homePage', pathMatch: 'full' },
  { path: 'homePage', component: HomePageComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
