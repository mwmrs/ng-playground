import {Observable, of, range} from 'rxjs';
import {concatMap, delay} from 'rxjs/operators';

/**
 * Einfache Methode ein Observable zu erzeugen, das in zufälligen Abständen die Zahlen von 1 bis 10 emittiert.
 */
export function randomDelayedCount(count = 10): Observable<number> {
  return range(1, count).pipe(
    concatMap(i => of(i).pipe(delay(1000 + (Math.random() * 4000))))
  );
}

export function delayedBy(milliseconds: number[]): Observable<string> {
  return new Observable<string>(sub => {
    milliseconds.forEach((value: number) => {
      setTimeout(() => sub.next(value + 'ms'), value);
    });
    setTimeout(() => sub.complete(), Math.max(...milliseconds) + 100);
  });
}
