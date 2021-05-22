import {range, Subscription, timer} from 'rxjs';
import {delayWhen} from 'rxjs/operators';

/**
 * delay() blocks the emission of the source observable for the given amount of time,
 * delayWhen() delays every value emitted by the source observable until a value of the given observable
 * will be emitted - for instance time(2000).
 */
export function howtoDelayWhen(): Subscription {
  const source$ = range(1, 20);

  return source$
    .pipe(
      delayWhen(() => timer(2000))
    )
    .subscribe(console.log);
}
