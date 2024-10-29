/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';
import { FlightBookingActions } from '../+state/flight-booking.actions';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectFlightsWithProps } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  protected readonly flights$ = this.store.select(selectFlightsWithProps({ blackList: [4] }));

  constructor(
    private flightService: FlightService,
    private store: Store<FlightBookingAppState>
  ) {}

  /*get flights(): Flight[] {
    return this.flightService.flights;
  }*/

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    // this.flightService.load(this.from, this.to, this.urgent);

    this.flightService.find(this.from, this.to, this.urgent).subscribe({
      next: (flights) => {
        this.store.dispatch(FlightBookingActions.loadFlightsSuccess({ flights }));
      },
      error: (err) => {
        console.error('error', err);
      }
    });
  }

  delay(): void {
    // this.flightService.delay();
    this.flights$.pipe(take(1)).subscribe((flights) => {
      if (flights.length > 0) {
        const oldDate = new Date(flights[0].date);
        const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
        const flight = { ...flights[0], date: newDate.toISOString() };

        this.store.dispatch(FlightBookingActions.updateFlight({ flight }));
      }
    });
  }
}
