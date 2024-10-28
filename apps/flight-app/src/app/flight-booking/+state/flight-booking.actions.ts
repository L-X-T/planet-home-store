import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';

export const FlightBookingActions = createActionGroup({
  source: 'FlightBooking',
  events: {
    loadFlights: props<{ from: string; to: string; urgent: boolean }>(),
    loadFlightsFailure: props<{ err: HttpErrorResponse }>(),
    loadFlightsSuccess: props<{ flights: Flight[] }>(),
    updateFlight: props<{ flight: Flight }>()
  }
});
