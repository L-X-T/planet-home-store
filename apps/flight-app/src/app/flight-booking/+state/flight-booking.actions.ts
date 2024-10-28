import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';

export const FlightBookingActions = createActionGroup({
  source: 'FlightBooking',
  events: {
    loadFlightsSuccess: props<{ flights: Flight[] }>(),
    updateFlight: props<{ flight: Flight }>()
  }
});
