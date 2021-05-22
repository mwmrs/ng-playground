import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export enum RxJsLoggingLevel {
  TRACE, DEBUG, INFO, ERROR
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel): void {
  rxjsLoggingLevel = level;
}

/**
 * A custom operator higher-order function
 *
 * @param level Log-Level
 * @param message Message
 */
export const debug = (level: number, message = '') =>
  (source: Observable<any>) =>
    source.pipe(
      tap(val => {
        if (level >= rxjsLoggingLevel) {
          console.log(message, val);
        }
      })
    );
