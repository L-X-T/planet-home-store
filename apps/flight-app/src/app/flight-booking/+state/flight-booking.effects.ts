import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { FlightService } from '@flight-workspace/flight-lib';
import { FlightBookingActions } from './flight-booking.actions';

@Injectable()
export class FlightBookingEffects {
  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightBookingActions.loadFlights),
      switchMap((action) => {
        // step 1: check action
        console.log('[effect] action:', action);
        return this.flightService.find(action.from, action.to, action.urgent).pipe(
          // step 2: check api result
          tap((result) => console.log('[effect] api result:', result)),
          map((flights) => FlightBookingActions.loadFlightsSuccess({ flights })),
          catchError((err) => of(FlightBookingActions.loadFlightsFailure({ err })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService
  ) {}
}
