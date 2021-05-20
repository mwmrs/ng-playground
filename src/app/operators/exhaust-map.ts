import {interval, Observable} from 'rxjs';
import {exhaustMap, map, tap} from 'rxjs/operators';

export function howtoExhaustMap(): void {
  const source$ = interval(1000).pipe(
    tap(value => console.log('Source: ' + value))
  );

  const inner$ = createInnerObservable();

  const result$ = source$.pipe(
    exhaustMap(sourceValue => inner$.pipe(
      map(innerValue => `Result: ${sourceValue}/${innerValue}`)
    ))
  );

  result$.subscribe(console.log);
}

/**
 * Erzeugt ein Observable, das nach 2700ms completed ist und in dieser Zeit
 * ein paar Werte herausgibt.
 */
function createInnerObservable(): Observable<string> {
  return new Observable<string>(sub => {
    setTimeout(() => sub.next('500ms'), 500);
    setTimeout(() => sub.next('1000ms'), 1000);
    setTimeout(() => sub.next('1200ms'), 1200);
    setTimeout(() => sub.next('1500ms'), 1500);
    setTimeout(() => sub.next('1700ms'), 1700);
    setTimeout(() => sub.next('2200ms'), 2200);
    setTimeout(() => sub.next('2600ms'), 2600);
    setTimeout(() => sub.complete(), 2700);
  });
}
