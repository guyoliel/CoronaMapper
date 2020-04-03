import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { MapPlayerComponent } from './map-player/map-player.component';
import { MapService } from './services/map.service';
import { CoronaService } from './services/corona.service';

@NgModule({
  declarations: [
    AppComponent,
    MapPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MapService,CoronaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
