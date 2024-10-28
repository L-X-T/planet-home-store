import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { FlightService } from '@flight-workspace/flight-lib';
import { FlightBookingActions } from './flight-booking.actions';

@Injectable()
export class FlightBookingEffects {
  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightBookingActions.loadFlights),
      switchMap((action) => this.flightService.find(action.from, action.to, action.urgent)),
      map((flights) => FlightBookingActions.loadFlightsSuccess({ flights }))
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService
  ) {}
}
