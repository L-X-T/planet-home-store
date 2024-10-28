import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightBookingState } from './flight-booking.state';
import { flightBookingFeatureKey } from './flight-booking.reducer';

const featureSelector = createFeatureSelector<FlightBookingState>(flightBookingFeatureKey);

export const selectFlights = createSelector(featureSelector, (state: FlightBookingState) => state.flights);
export const selectNegativeList = createSelector(featureSelector, (state: FlightBookingState) => state.negativeList);

export const selectFilteredFlights = createSelector(selectFlights, selectNegativeList, (flights, negativeList) =>
  flights.filter((f) => !negativeList.includes(f.id))
);

export const selectFlightsWithProps = (props: { blackList: number[] }) =>
  createSelector(selectFlights, (flights) => flights.filter((f) => !props.blackList.includes(f.id)));
