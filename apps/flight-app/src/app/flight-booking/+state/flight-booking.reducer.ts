import { createFeature, createReducer, on } from '@ngrx/store';
import { FlightBookingActions } from './flight-booking.actions';
import { FlightBookingState, initialState } from './flight-booking.state';
import { state } from '@angular/animations';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.loadFlightsSuccess, (state, { flights }): FlightBookingState => ({ ...state, flights })),

  on(FlightBookingActions.updateFlight, (state, action): FlightBookingState => {
    const flight = action.flight;
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights: flights };
  })
);
