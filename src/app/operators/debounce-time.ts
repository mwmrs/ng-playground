import {debounceTime} from 'rxjs/operators';
import {randomDelayedCount} from './util';
import {Subscription} from 'rxjs';
import {debug, RxJsLoggingLevel} from './custom-debug';

/**
 * debounceTime(dueTime) sorts out all values emitted by a source-observables that are not 'stable'.
 * This means there mustn't be a subsequent value emitted by the given amount of time. Otherwise
 * the first one will be ignored.
 */
export function howtoDebouncetime(): Subscription {
  const source$ = randomDelayedCount();

  return source$
    .pipe(
      debug(RxJsLoggingLevel.INFO, 'Source'),
      debounceTime(200)
    )
    .subscribe(console.log);
}
