import { Injectable } from '@angular/core';
import countries from './countries.json';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  formattedCountries = {};

  constructor() {
    countries.forEach(country => this.formattedCountries[country.name] = country);
  }

  getCountry(name){
    return this.formattedCountries[name];
  }

}
