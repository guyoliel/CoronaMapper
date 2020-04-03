import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { GeoJson } from '../models/GeoJson';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';

@Injectable()
export class MapService {

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }


  getMarkers(): Array<GeoJson> {
    const geoJson = [
      new GeoJson(['80.20929129999999', '13.0569951'], {message: 'Chennai'}),
      new GeoJson(['77.350048', '12.953847' ], {message: 'bangulare'})
    ];
    return geoJson;
  }
}
