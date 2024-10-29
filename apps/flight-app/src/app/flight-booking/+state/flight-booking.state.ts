import { Flight } from '@flight-workspace/flight-lib';
import { HttpErrorResponse } from '@angular/common/http';

export interface FlightBookingState {
  flights: Flight[];
  blacklist: number[];
  isLoadingFlights: boolean;
  flightsLoadError: HttpErrorResponse | null;
}

export const initialState: FlightBookingState = {
  flights: [],
  blacklist: [3],
  isLoadingFlights: false,
  flightsLoadError: null
};
