# Selectors

* [Selectors](#selectors)
  * [Adding a first selector](#adding-a-first-selector)
  * [Bonus: Using feature selectors *](#bonus-using-feature-selectors-)
  * [Bonus: Using parameterized selectors *](#bonus-using-parameterized-selectors-)

## Adding a first selector

In this part of the lab, you'll add a selector that queries all the flights that are not on a defined negative list.

1. Open the file ``flight-booking.reducer.ts`` or ``flight-booking.state.ts`` and add a property ``negativeList`` to your ``FlightBookingState``:

    ```typescript
    export interface FlightBookingState {
      flights: Flight[];
      negativeList: number[];
    }

    export const initialState: FlightBookingState = {
      flights: [],
      negativeList: [3]
    };
    ```

    For the sake of simplicity, this example defines a default value for the negative list to filter the flight with the id 3.

2. In your ``+state`` folder, open (or create) the file ``flight-booking.selectors.ts`` and enter the following lines (with the updated ``featureSelector``):

    ```typescript
    import { createSelector } from "@ngrx/store";
    import { FlightBookingState } from './flight-booking.state';
    import { flightBookingFeatureKey } from './flight-booking.reducer';

    const featureSelector = createFeatureSelector<FlightBookingState>(flightBookingFeatureKey);
    ```

3. Now, you can add the selectors for the fields in the ``FlightBookingState``:
    
    ```typescript
    export const selectFlights = createSelector(featureSelector, (state: FlightBookingState) => state.flights);
    export const selectNegativeList = createSelector(featureSelector, (state: FlightBookingState) => state.negativeList);
    ```

4. Create an additional selector that filters the flights based on the negative list:

    ```typescript
    export const selectFilteredFlights = createSelector(selectFlights, selectNegativeList, (flights, negativeList) =>
      flights.filter((f) => !negativeList.includes(f.id))
    );
    ```

5. In your ``flight-search.component.ts``, use the selector when fetching data from the store:

    ```typescript
    readonly flights$ = this.store.select(selectFilteredFlights);
    ```

6. Test your application.

## Bonus: Using parameterized selectors *

You can pass a property object to a selector when calling it. This object is assigned to a further parameter in your selectors projection function.

1. In your ``flight-booking.selectors.ts`` file, add the following selector:

    ```typescript
    export const selectFlightsWithProps = (props: { blackList: number[] }) =>
      createSelector(selectFlights, (flights) => flights.filter((f) => !props.blackList.includes(f.id))
    );
    ```

    Please note that the projector get an additional ``props`` parameter. It points to a dynamic object.

2. Open the file ``flight-search.component.ts`` and fetch data with this selector:

    ```typescript
    flights$ = this.store.select(selectFlightsWithProps({ blackList: [3] }));
    ```

3. Test your solution.
