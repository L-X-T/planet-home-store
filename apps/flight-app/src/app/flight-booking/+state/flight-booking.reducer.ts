import { createReducer, on } from '@ngrx/store';
import { FlightBookingActions } from './flight-booking.actions';
import { FlightBookingState, initialState } from './flight-booking.state';
import { Flight } from '@flight-workspace/flight-lib';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export const reducer = createReducer(
  initialState,

  on(
    FlightBookingActions.loadFlights,
    (state): FlightBookingState => ({ ...state, flights: [], isLoadingFlights: true, flightsLoadError: null })
  ),

  on(
    FlightBookingActions.loadFlightsFailure,
    (state, { err }): FlightBookingState => ({ ...state, flights: [], isLoadingFlights: false, flightsLoadError: err })
  ),

  /*on(FlightBookingActions.loadFlightsSuccess, (state, action): FlightBookingState => {
    const flights: Flight[] = action.flights;
    return {
      ...state,
      flights: flights,
      isLoadingFlights: false,
      flightsLoadError: null
    };
  }),*/

  /*on(
    FlightBookingActions.loadFlightsSuccess,
    (state, action): FlightBookingState => ({
      ...state,
      flights: action.flights,
      isLoadingFlights: false,
      flightsLoadError: null
    })
  ),*/

  on(
    FlightBookingActions.loadFlightsSuccess,
    (state, { flights }): FlightBookingState => ({ ...state, flights, isLoadingFlights: false, flightsLoadError: null })
  ),

  on(FlightBookingActions.updateFlight, (state, action): FlightBookingState => {
    const flight = action.flight;
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights: flights };
  }),

  on(FlightBookingActions.updateFlight, (state, action): FlightBookingState => {
    const flight = action.flight;
    const flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
    return { ...state, flights: flights };
  })
);
