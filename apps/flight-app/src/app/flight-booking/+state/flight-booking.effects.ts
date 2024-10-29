import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlightBookingActions } from './flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-lib';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class FlightBookingEffects {
  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightBookingActions.loadFlights),
      // action$
      switchMap((action) =>
        this.flightService.find(action.from, action.to, action.urgent).pipe(
          // flights$
          // delay(5_000),
          map((flights) => FlightBookingActions.loadFlightsSuccess({ flights })),
          catchError((err: HttpErrorResponse) => of(FlightBookingActions.loadFlightsFailure({ err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService
  ) {}
}
