import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-totals-popup',
  templateUrl: './totals-popup.component.html',
  styleUrls: ['./totals-popup.component.css']
})
export class TotalsPopupComponent implements OnInit {
  public properties;

  events: {date: string, recovered: number, confirmed: number, deaths: number}[];
  latestEvent: {date: string, recovered: number, confirmed: number, deaths: number};
  totalDeaths: number;
  totalConfirmed: number;
  totalRecovered: number;

  constructor() { }

  ngOnInit(): void {
    this.events = JSON.parse(this.properties.data);
    this.latestEvent = this.events[this.events.length - 1];
  }

  reduceSum(numbers: number[]){
    return numbers.reduce((a, b) => {
      console.log('a: ' + a + ' b: ' + b);
      return a + b;});
  }
}
