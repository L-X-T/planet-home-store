/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { flightBookingFeatureKey, FlightBookingAppState } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { FlightBookingActions } from '../+state/flight-booking.actions';

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

  readonly flights$ = this.store.select((appState) => appState[flightBookingFeatureKey].flights);

  constructor(
    private flightService: FlightService,
    private store: Store<FlightBookingAppState>
  ) {}

  get flights(): Flight[] {
    return this.flightService.flights;
  }

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
    this.flightService.delay();
  }
}
