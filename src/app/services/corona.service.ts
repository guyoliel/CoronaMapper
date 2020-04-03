import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountriesService } from './countries.service';
import { map, flatMap, count } from 'rxjs/operators';
import { GeoJson } from '../models/GeoJson';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  constructor(private http: HttpClient, private countriesService: CountriesService) {}

  getCountriesData(){
    return this.http.get('https://pomber.github.io/covid19/timeseries.json')
    .pipe(
      map(allCountries => Object.keys(allCountries).map(key => {  // * Transform countries dict to array
        return {name: key /*, value: allCountries[key]*/, locationData: undefined};
      }).
      map(country => { // * Enrich each country with location from countries service
        country.locationData = this.countriesService.getCountry(country.name);
        return country;
      })
      .filter(country => country.locationData)
      .map(country => {
        return new GeoJson([country.locationData.latlng[1],country.locationData.latlng[0]], {message: country.name}); })
    ));
  }
}
