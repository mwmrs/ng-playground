import {debounceTime, tap} from 'rxjs/operators';
import {randomDelayedCount} from './util';

/**
 * debounceTime(dueTime) sortiert alle Werte des Source-Observables aus, die nicht mindestens die angegebene
 * Zeit (in ms) stabil sind, d.h. das Source-Observable muss mindestens die angegeben Zeit 'schweigen',
 * damit der aktuelle Wert gelesen wird.
 */
export function howtoDebouncetime(): void {
  const source$ = randomDelayedCount();

  source$
    .pipe(
      tap(value => console.log('Source', value)),
      debounceTime(2000)
    )
    .subscribe(console.log);
}
