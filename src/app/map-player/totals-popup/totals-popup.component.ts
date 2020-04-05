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
    this.events = JSON.parse(this.properties.data)
    .map(event => {
      event.recovered = this.numberWithCommas(event.recovered);
      event.deaths = this.numberWithCommas(event.deaths);
      event.confirmed = this.numberWithCommas(event.confirmed);
      return event;
    });
    this.latestEvent = this.events[this.events.length - 1];

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
