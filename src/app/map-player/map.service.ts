import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';

@Injectable()
export class MapService {

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }


  getMarkers(): Array<any> {
    const geoJson = [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: ['80.20929129999999', '13.0569951']
      },
      properties: {
        message: 'Chennai'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: ['77.350048', '12.953847' ]
      },
      properties: {
        message: 'bangulare'
      }
    }];
    return geoJson;
  }

  createMarker(data: GeoJson) {
    return [];
  }

  removeMarker($key: string) {
    return {};
  }
}
