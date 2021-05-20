import {of} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';

export function howtoConcatMap(): void {
  const source$ = of(1, 2, 3);
  const inner$ = of('A', 'B', 'C');

  const result$ = source$.pipe(
    concatMap((value1) => inner$.pipe(
      map(value2 => `Result: ${value1} ${value2}`)
    ))
  );

  result$.subscribe(console.log);
}
