import {of, Subscription} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';

/**
 * concatMap serializes the values of the source observable with the values of the inner observable,
 * this means no value is lost (<> exhaustMap) and the order is guaranteed (<> mergeMap).
 * All subscriptions to the inner observables are processed in the order of the subscriptions.
 * No subscription to the inner observables will be canceled!
 */
export function howtoConcatMap(): Subscription {
  const source$ = of(1, 2, 3);
  const inner$ = of('A', 'B', 'C');

  const result$ = source$.pipe(
    concatMap((value1) => inner$.pipe(
      map(value2 => `Result: ${value1} ${value2}`)
    ))
  );

  return result$.subscribe(console.log);
}
