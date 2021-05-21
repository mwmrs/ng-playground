import {range, Subscription, timer} from 'rxjs';
import {delayWhen} from 'rxjs/operators';

/**
 * delay() wartet eine absolute Zeitangabe (blockiert das ganze Observable), bis die Werte emitted werden,
 * delayWhen() wartet für jeden Wert aus dem Source-Observable auf das Ereignis des übergebenen Observables -
 * hier timer(2000).
 */
export function howtoDelayWhen(): Subscription {
  const source$ = range(1, 20);

  return source$
    .pipe(
      delayWhen(() => timer(2000))
    )
    .subscribe(console.log);
}
