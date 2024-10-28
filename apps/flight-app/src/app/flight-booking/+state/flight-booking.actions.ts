import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FlightBookingActions = createActionGroup({
  source: 'FlightBooking',
  events: {
    'Load FlightBookings': emptyProps(),
    
    
  }
});
