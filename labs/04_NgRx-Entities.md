# @ngrx/entity and @ngrx/schematics

* [@ngrx/entity and @ngrx/schematics](#ngrxentity-and-ngrxschematics)
  * [Managing Passengers](#managing-passengers)
  * [Bonus: Loading passengers **](#bonus-loading-passengers-)

## Managing Passengers

In this exercise, you will leverage ``@ngrx/entity`` and ``@ngrx/schematics`` to manage ``Passenger`` entities with the store. For this, you will create an separate PassengerModule with a PassengerComponent.

1. Use the CLI to generate a new ``PassengersModule`` with the boilerplate for ``@ngrx/entity``. For this, switch into the folder ``flight-app\src\app`` and use the following commands:

    ```
    ng g module passengers
    cd passengers
    ng g @ngrx/schematics:entity Passenger --module passengers.module.ts --creators
    ```

3. Discover the generated files.

4. Open the file ``passenger.model`` and add a ``name`` property to the ``Passenger`` class. Also, **make the id a number**:

    ```typescript
    export interface Passenger {
      id: number;    // <-- Modify (number)
      name: string;  // <-- Add this
    }
    ```

5. In the ``passengers`` folder, create a new file ``passenger.selectors.ts``:

    ```typescript
    import * as fromPassenger from './passenger.reducer';
    import { createSelector } from '@ngrx/store';
    import { passengersFeatureKey } from './passenger.reducer';
    
    // Parent node pointing to passenger state
    export class PassengerAppState {
      [passengersFeatureKey]: fromPassenger.State;
    }

    // Selector pointing to passenger state in store
    const base = (s:PassengerAppState) => s.passengers;

    // Selector pointing to all passenger entities
    export const selectAllPassengers = createSelector(base, fromPassenger.selectAll);
    ```

6. In the ``passengers`` folder, create a new ``PassengersComponent``. In its ``ngOnInit`` method, send an ``AddPassengers`` action with an hard coded array of passengers to the store and query all the passengers using the above mentioned ``selectAllPassengers`` selector. Display the passengers in the template.

    <details>
    <summary>Show code (TypeScript)</summary>
    <p>

    ```typescript
    @Component({
      selector: 'app-passengers',
      templateUrl: './passengers.component.html',
      styleUrls: ['./passengers.component.css']
    })
    export class PassengersComponent {
      passengers$: Observable<Passenger[]>;
   
      constructor(private store: Store<PassengerAppState>) {
        this.store.dispatch(addPassengers({ passengers: [{ id: 1, name: 'Max' }, { id: 2, name: 'Susi' }]}));
        this.passengers$ = this.store.select(selectAllPassengers);
      }
    }
    ```

    </p>
    </details>

    <details>
    <summary>Show code (HTML)</summary>
    <p>
    
    ```html
    <div class="card">
      <div class="header">
        <h2 class="title">Latest Passengers</h2>
      </div>
   
      <div class="content">
        <pre>{{ passengers$ | async | json }}</pre>
      </div>
    </div>
    ```
    
    </p>
    </details>

7. Make sure, the ``PassengersComponent`` is declared **AND** exported with the ``PassengerModule``.

8. Make sure, the ``PassengersModule`` is imported into the ``AppModule``.

9. Call the ``PassengersComponent`` within the ``HomeComponent`` to try it out.

    ```html
    <app-passengers />
    ```

10. Test your application.

## Bonus: Loading passengers **

Extend your solution to load passengers using a search form and an effect. You can use the following Web API for this:

    http://angular.at/api/passenger?name=Muster

Please note that this Web API is using PascalCase to display attributes with XML but camelCase for JSON to respect the respective usual conventions.
