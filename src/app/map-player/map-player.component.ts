import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';
import { CoronaService } from '../services/corona.service';
import { GeoJson } from '../models/GeoJson';
import { FeatureCollection } from '../models/FeatureCollection';
import { DynamicComponentService } from '../services/dynamic-component.service';
import { TotalsPopupComponent } from './totals-popup/totals-popup.component';

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

  constructor(private mapService: MapService,
              private coronaService: CoronaService,
              private dynamicComponentService: DynamicComponentService) {
  }

  ngOnInit() {
    this.initializeMap();
    this.coronaService.getCountriesData().subscribe(x => this.markers = x as GeoJson[]);
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
      zoom: 7,
      center: [this.lng, this.lat]
    });

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.setupMapCursorEvents();

    const self = this;
    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      this.map.loadImage('../../assets/virus.png',function(error, image) {
        if (error) { throw error; }
        self.map.addImage('virus', image);
      });

      /// register source
      this.map.addSource('markers_layer', {
         type: 'geojson',
         data: {
           type: 'FeatureCollection',
           features: []
         }
      });

      /// get source
      this.source = this.map.getSource('markers_layer');

      /// subscribe to realtime database and set data source
      let data = new FeatureCollection(this.markers);
      this.source.setData(data);

      /// create map layers with realtime data
      this.map.addLayer({
        id: 'markers_layer',
        source: 'markers_layer',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'virus',
          'icon-size': 0.08,
          'text-offset': [0, 1.5],
          'icon-allow-overlap': true
        },
        paint: {
          'text-color': '#791212',
          'text-halo-color': '#000',
          'text-halo-width': 1
        }
      });

    });
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }

  setupMapCursorEvents(){
    this.map.on('click', 'markers_layer', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      // Inside a map.on("click") or wherever you want to create your popup

      // Inject Component and Render Down to HTMLDivElement Object
      const popupContent = this.dynamicComponentService.injectComponent(
        TotalsPopupComponent,
        x => x.properties = e.features[0].properties); // This Is where You can pass
      // a Model or other Properties to your Component

      new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(coordinates) 
      .setDOMContent(popupContent)
      .addTo(this.map);

    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    this.map.on('mouseenter', 'markers_layer', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'markers_layer', () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

}
