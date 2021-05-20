import {interval} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

export function howtoMergeMap(): void {
  const source$ = interval(1000);
  const inner$ = source$.pipe(map(val => val * 10));

  const result$ = source$.pipe(
    mergeMap((value1) => inner$.pipe(
      map(value2 => value1 + '/' + value2)
    ))
  );

  result$.subscribe(console.log);
}
