import {interval} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {delayedBy} from './util';

export function howtoSwitchMap(): void {
  const source$ = interval(1000).pipe(
    tap(value => console.log('Source: ' + value))
  );

  const inner$ = delayedBy([100, 300, 1200, 1500, 1700, 2200, 2600]);

  const result$ = source$.pipe(
    switchMap(sourceValue => inner$.pipe(
      map(innerValue => `Result: ${sourceValue}/${innerValue}`)
    ))
  );

  result$.subscribe(console.log);
}
