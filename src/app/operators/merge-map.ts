import {interval, Subscription} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

/**
 * Während concatMap immer serialisiert, wartet mergeMap nicht auf das Complete des Inner-Observables,
 * sondern setzt direkt mit dem nächsten Wert des Source-Observables die Übergabe an das Inner-Observable fort.
 * Die Reihenfolge ist daher nicht garantiert, aber es geht kein Wert verloren (<> exhaustMap).
 * Bzgl. der Subscriptions wie concatMap, aber es gibt keine Reihenfolge. Daher findet keine Serialisierung statt.
 */
export function howtoMergeMap(): Subscription {
  const source$ = interval(1000);
  const inner$ = source$.pipe(map(val => val * 10));

  const result$ = source$.pipe(
    mergeMap((value1) => inner$.pipe(
      map(value2 => value1 + '/' + value2)
    ))
  );

  return result$.subscribe(console.log);
}
