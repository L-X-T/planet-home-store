import { createReducer, on } from '@ngrx/store';
import { FlightBookingState, initialState } from './flight-booking.state';
import { FlightBookingActions } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.loadFlightsSuccess, (state, { flights }): FlightBookingState => ({ ...state, flights }))
);
