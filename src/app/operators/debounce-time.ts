import {debounceTime, tap} from 'rxjs/operators';
import {randomDelayedCount} from './util';

export function howtoDebouncetime(): void {
  const source$ = randomDelayedCount();

  source$
    .pipe(
      tap(value => console.log('Source', value)),
      debounceTime(2000)
    )
    .subscribe(console.log);
}
