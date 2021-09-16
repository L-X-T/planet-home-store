# Managing side effects with @ngrx/effects

* [Managing side effects with @ngrx/effects](#managing-side-effects-with-ngrxeffects)
  * [Creating an Effect](#creating-an-effect)
  * [Bonus: Error Handling](#bonus-error-handling)

In this exercise you will create an effect for loading flights.

## Creating an Effect

1. Open your ``flight-booking.actions.ts`` file and add a ``loadFlights`` action:

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    [...]

    export const FlightBookingActions = createActionGroup({
      source: 'FlightBooking',
      events: {
        loadFlights: props<{ from: string; to: string; urgent: boolean }>(),
        loadFlightsSuccess: props<{ flights: Flight[] }>(),
        updateFlight: props<{ flight: Flight }>()
      }
    });
    ```

    </p>
    </details>


2. Open the file ``flight-booking.effects.ts`` and add an effect that takes a ``FlightsLoadAction``, loads the requested flights and returns a ``FlightsLoadedAction``.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    [...]
    // make sure to add all imports
 
    @Injectable()
    export class FlightBookingEffects {
      loadFlights$ = createEffect(() => 
        this.actions$.pipe(
          ofType(FlightBookingActions.loadFlights), 
          switchMap((action) => this.flightService.find(action.from, action.to, action.urgent)),
          map((flights) => FlightBookingActions.loadFlightsSuccess({ flights }))
        )
      );

      constructor(private actions$: Actions, private flightService: FlightService) {}
    }
    ```

    </p>
    </details>

3. Open the file ``flight-search.component.ts``. Change the ``search`` method so that it just dispatches a ``loadFlights`` action.

    <details>
    <summary>Show code</summary>
    <p>

    ```typescript
    search(): void {
      if (!this.from || !this.to) {
        return;
      }

      // old:
      /*this.flightService.find(this.from, this.to, this.urgent)
        .subscribe({
          next: (flights) => { 
            this.store.dispatch(new flightsLoaded({flights}));
          },
          error: (err) => {
              console.error('error', err);
          } 
        });*/
   
      // new:
      this.store.dispatch(FlightBookingActions.loadFlights({
        from: this.from, 
        to: this.to, 
        urgent: this.urgent 
      }));
    }

    ```

    </p>
    </details>

4. Test the application.

5. Use the ``Redux DevTools`` Chrome plugin to find out which actions are dispatched.

## Bonus: Error Handling

1. Open your ``flight-booking.actions.ts`` file and add an LoadFlightsError Action with an ``HttpErrorResponse`` payload:

    ```typescript
    [...]

    export const FlightBookingActions = createActionGroup({
      source: 'FlightBooking',
      events: {
        loadFlights: props<{ from: string; to: string; urgent: boolean }>(),
        loadFlightsFailure: props<{ err: HttpErrorResponse }>(),
        loadFlightsSuccess: props<{ flights: Flight[] }>(),
        updateFlight: props<{ flight: Flight }>()
      }
    });
    ```

2. In your ``flight-booking.effects.ts``, add an error handler to the switchMap. This error handler should return the ``loadFlightError`` action.

    <details>
    <summary>Show code</summary>
    <p>
    
    ```typescript
      loadFlights$ = createEffect(() => 
        this.actions$.pipe(
          ofType(FlightBookingActions.loadFlights), 
          switchMap((action) =>
            this.flightService.find(action.from, action.to, action.urgent).pipe(
              map((flights) => FlightBookingActions.loadFlightsSuccess({ flights })),
              catchError((err) => of(FlightBookingActions.loadFlightsFailure({ err })))
            )
          )
        )
      );
    ```
    
    </p>  
    </details>

3. Test your solution. You can simulate an error with the Browser's dev tools by activating offline module in the ``Network`` tab.
   
4. Use the Redux Dev Tools to make sure, that the ``loadFlightsError`` action is send to the store.
