import {interval} from 'rxjs';
import {exhaustMap, map, tap} from 'rxjs/operators';
import {delayedBy} from './util';

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
