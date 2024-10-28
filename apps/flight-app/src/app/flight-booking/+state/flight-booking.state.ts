import { Flight } from '@flight-workspace/flight-lib';

export type FlightBookingState = {
  flights: Flight[];
  negativeList: number[];
  isLoadingFlights: boolean;
  loadingFlightsError: string;
};

export const initialState: FlightBookingState = {
  flights: [],
  negativeList: [3],
  isLoadingFlights: false,
  loadingFlightsError: ''
};
