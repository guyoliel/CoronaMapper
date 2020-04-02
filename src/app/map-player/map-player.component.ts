import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from './map.service';
import { GeoJson, FeatureCollection } from './map';


@Component({
  selector: 'map-player',
  templateUrl: './map-player.component.html',
  styleUrls: ['./map-player.component.css']
})
export class MapPlayerComponent implements OnInit{

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/guyo470/ck8irliu939591inyf27sdoq1';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.markers = this.mapService.getMarkers();
    this.initializeMap();
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

    this.buildMap();

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    const self = this;
    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      this.map.loadImage('../../assets/virus.png',function(error, image) {
        if (error) throw error;
        self.map.addImage('virus', image);
      });

      /// register source
      this.map.addSource('data_layer', {
         type: 'geojson',
         data: {
           type: 'FeatureCollection',
           features: []
         }
      });

      /// get source
      this.source = this.map.getSource('data_layer');

      /// subscribe to realtime database and set data source
      let data = new FeatureCollection(this.markers);
      this.source.setData(data);

      /// create map layers with realtime data
      this.map.addLayer({
        id: 'markers_layer',
        source: 'data_layer',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'virus',
          'icon-size': 0.08,
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#791212',
          'text-halo-color': '#000',
          'text-halo-width': 1
        }
      });

    });
  }
  /// Helpers
  removeMarker(marker) {
    this.mapService.removeMarker(marker.$key)
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }
}
