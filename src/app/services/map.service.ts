import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { GeoJson } from '../models/GeoJson';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  public mapboxgl = mapboxgl;

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
