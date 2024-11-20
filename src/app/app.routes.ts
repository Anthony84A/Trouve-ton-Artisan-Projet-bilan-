import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { BatimentComponent } from './components/batiment/batiment.component';
import { ServicesComponent } from './components/services/services.component';
import { FabricationComponent } from './components/fabrication/fabrication.component';
import { AlimentationComponent } from './components/alimentation/alimentation.component';
import { FicheArtisanComponent } from './components/fiche-artisan/fiche-artisan.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'batiment', component: BatimentComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'fabrication', component: FabricationComponent},
  { path: 'alimentation', component: AlimentationComponent},
  { path: 'fiche-artisan/:id', component: FicheArtisanComponent },
  { path: '**', component: NotFoundComponent },
  { path: 'search-results', component: SearchResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}