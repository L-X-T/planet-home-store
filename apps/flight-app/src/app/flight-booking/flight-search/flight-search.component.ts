/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { FlightBookingActions } from '../+state/flight-booking.actions';
import { delay, take } from 'rxjs';
import { selectFlights, selectIsLoadingFlights, selectLoadingFlightsError } from '../+state/flight-booking.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  protected from = 'Hamburg'; // in Germany
  protected to = 'Graz'; // in Austria
  protected urgent = false;

  // "shopping basket" with selected flights
  protected basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  // readonly flights$ = this.store.select((store) => store[flightBookingFeatureKey].flights);
  protected readonly flights$ = this.store.select(selectFlights);
  protected readonly flights = this.store.selectSignal(selectFlights);
  protected readonly isLoadingFlight$ = this.store.select(selectIsLoadingFlights);
  protected readonly loadingFlightsError$ = this.store.select(selectLoadingFlightsError);

  constructor(
    private flightService: FlightService,
    private store: Store<FlightBookingAppState>
  ) {
    // step 4: check if flights reach my component
    this.flights$.pipe(takeUntilDestroyed()).subscribe((flights) => console.log('[comp] flights:', flights));
  }

  search(): void {
    if (!this.from || !this.to) {
      return;
    }

    // this.flightService.load(this.from, this.to, this.urgent);

    /*this.flightService.find(this.from, this.to, this.urgent).subscribe({
      next: (flights) => {
        this.store.dispatch(FlightBookingActions.loadFlightsSuccess({ flights }));
      },
      error: (err) => {
        console.error('error', err);
      }
    });*/

    this.store.dispatch(
      FlightBookingActions.loadFlights({
        from: this.from,
        to: this.to,
        urgent: this.urgent
      })
    );
  }

  delay(): void {
    this.flights$.pipe(take(1)).subscribe((flights) => {
      const oldDate = new Date(flights[0].date);
      const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      const flight = { ...flights[0], date: newDate.toISOString() };

      this.store.dispatch(FlightBookingActions.updateFlight({ flight }));
    });
  }
}
