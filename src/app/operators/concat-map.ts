import {of} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';

/**
 * concatMap serialisiert die Werte des Source-Observables mit den Werten des Inner-Observables,
 * d.h. kein Wert geht verloren (<> exhaustMap) und die Reihenfolge ist garantiert (<> mergeMap).
 * Alle Subscriptions zu den Inner-Observables werden in der Reihenfolge der Subscriptions abgearbeitet.
 * Keine Subscription zu den Inner-Observables wird gecancelt!
 */
export function howtoConcatMap(): void {
  const source$ = of(1, 2, 3);
  const inner$ = of('A', 'B', 'C');

  const result$ = source$.pipe(
    concatMap((value1) => inner$.pipe(
      map(value2 => `Result: ${value1} ${value2}`)
    ))
  );

  result$.subscribe(console.log);
}
