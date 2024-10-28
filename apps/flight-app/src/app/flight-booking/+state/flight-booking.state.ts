import { Flight } from '@flight-workspace/flight-lib';

export interface FlightBookingState {
  flights: Flight[];
}

export const initialState: FlightBookingState = {
  flights: []
};
