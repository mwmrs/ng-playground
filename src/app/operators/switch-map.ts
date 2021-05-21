import {interval} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {delayedBy} from './util';

/**
 * Für jeden neuen Wert des Source-Observables wird ein neues Inner-Observable angelegt.
 * Die Subscription auf dieses Inner-Observable wird jedoch gecancelt, sobald ein neuer Wert
 * vom Source-Observable eintrifft. Daher gehen verbleibende Werte  aus dem letzten Inner-Observable verloren.
 * Es findet also immer ein Switch auf das neueste Inner-Observable statt.
 * (Anwendungsfall: type-ahead search, d.h. ein Backend-Search-Request wird abgebrochen - über einen AbortController -
 * wenn sich der Suche-String geändert hat.)
 */
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
