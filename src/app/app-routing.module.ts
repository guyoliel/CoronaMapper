import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapPlayerComponent } from './map-player/map-player.component';


const routes: Routes = [
  {
    path: '',
    component: MapPlayerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
