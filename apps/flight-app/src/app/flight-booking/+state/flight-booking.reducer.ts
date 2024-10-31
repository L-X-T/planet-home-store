import { createReducer, on } from '@ngrx/store';
import { FlightBookingState, initialState } from './flight-booking.state';
import { FlightBookingActions } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.loadFlights, (state, a): FlightBookingState => {
    return { ...state, flights: [], isLoadingFlights: true, loadingFlightsError: '' };
  }),

  on(FlightBookingActions.loadFlightsFailure, (state, { err }): FlightBookingState => {
    return { ...state, isLoadingFlights: false, loadingFlightsError: err.message };
  }),

  on(FlightBookingActions.loadFlightsSuccess, (state, { flights }): FlightBookingState => {
    // step 3: check reducer
    // better: check state tree in Redux DevTools
    console.log('[store] flights:', flights);
    return { ...state, flights, isLoadingFlights: false };
  }),

  on(FlightBookingActions.updateFlight, (state, { flight }): FlightBookingState => {
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights };
  })
);
