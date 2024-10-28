import { Flight } from '@flight-workspace/flight-lib';

export type FlightBookingState = {
  flights: Flight[];
};

export const initialState: FlightBookingState = {
  flights: []
};
