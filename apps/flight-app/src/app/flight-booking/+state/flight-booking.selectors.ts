import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightBookingState } from './flight-booking.state';
import { flightBookingFeatureKey } from './flight-booking.reducer';

const featureSelector = createFeatureSelector<FlightBookingState>(flightBookingFeatureKey);

export const selectFlights = createSelector(featureSelector, (state: FlightBookingState) => state.flights);
export const selectBlacklist = createSelector(featureSelector, (state: FlightBookingState) => state.blacklist);

export const selectFilteredFlights = createSelector(selectFlights, selectBlacklist, (flights, blacklist) => {
  return flights.filter((f) => !blacklist.includes(f.id));
});

export const selectFlightsWithProps = (props: { blackList: number[] }) =>
  createSelector(selectFlights, (flights) => flights.filter((f) => !props.blackList.includes(f.id)));
