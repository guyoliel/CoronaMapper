import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { MapPlayerComponent } from './map-player/map-player.component';
import { MapService } from './services/map.service';
import { CoronaService } from './services/corona.service';
import { TotalsPopupComponent } from './map-player/totals-popup/totals-popup.component';
import { DynamicComponentService } from './services/dynamic-component.service';

@NgModule({
  declarations: [
    AppComponent,
    MapPlayerComponent,
    TotalsPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: [MapService,CoronaService,DynamicComponentService],
  bootstrap: [AppComponent],
  entryComponents: [TotalsPopupComponent]
})
export class AppModule { }
