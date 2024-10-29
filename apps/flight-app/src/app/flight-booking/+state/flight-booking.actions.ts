import { createActionGroup, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';
import { HttpErrorResponse } from '@angular/common/http';

export const FlightBookingActions = createActionGroup({
  source: 'FlightBooking',
  events: {
    loadFlights: props<{ from: string; to: string; urgent: boolean }>(),
    loadFlightsFailure: props<{ err: HttpErrorResponse }>(),
    loadFlightsSuccess: props<{ flights: Flight[] }>(),
    updateFlight: props<{ flight: Flight }>()
  }
});
