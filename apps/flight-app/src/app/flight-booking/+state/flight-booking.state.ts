import { Flight } from '@flight-workspace/flight-lib';

export interface FlightBookingState {
  flights: Flight[];
  negativeList: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  negativeList: [3]
};
