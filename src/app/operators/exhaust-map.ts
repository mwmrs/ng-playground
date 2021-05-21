import {interval} from 'rxjs';
import {exhaustMap, map, tap} from 'rxjs/operators';
import {delayedBy} from './util';

/**
 * Für einen neuen Wert aus dem Source-Observable wird ein neues Inner-Observable angelegt.
 * Jedoch wird erst auf das complete des Inner-Observables gewartet, bevor für einen neuen Wert aus dem
 * Source-Observable ein weiteres neues Inner-Observable angelegt wird. Das führt dazu, dass alle Werte
 * aus dem Source-Observable, die währenddessen eintreffen, ignoriert werden.
 */
export function howtoExhaustMap(): void {
  const source$ = interval(1000).pipe(
    tap(value => console.log('Source: ' + value))
  );

  const inner$ = delayedBy([500, 1000, 1200, 1500, 1700, 2200, 2600]);

  const result$ = source$.pipe(
    exhaustMap(sourceValue => inner$.pipe(
      map(innerValue => `Result: ${sourceValue}/${innerValue}`)
    ))
  );

  result$.subscribe(console.log);
}
