import { Flight } from '@flight-workspace/flight-lib';

export interface FlightBookingState {
  flights: Flight[];
  blacklist: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  blacklist: [3]
};
