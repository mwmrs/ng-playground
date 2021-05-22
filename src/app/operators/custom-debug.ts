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

/**
 * Same as debug but verbose
 * https://netbasal.com/creating-custom-operators-in-rxjs-32f052d69457
 */
export function debug1(level: number, message = ''): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>): Observable<T> =>
    new Observable(subscriber => {
      return source.subscribe({
        next(value): void {
          tap(val => {
            if (level >= rxjsLoggingLevel) {
              console.log(message, val);
            }
          });
          subscriber.next(value);
        },
        error(error): void {
          subscriber.error(error);
        },
        complete(): void {
          subscriber.complete();
        }
      });
    });
}

/**
 * How to style console output
 * @param tag e.g. INFO
 */
// tslint:disable-next-line:typedef
export function debug2(tag: string) {
  return tap({
    next(value): void {
      console.log(`%c[${tag}: Next]`, 'background: #009688; color: #fff; padding: 3px; font-size: 9px;', value);
    },
    error(error): void {
      console.log(`%[${tag}: Error]`, 'background: #E91E63; color: #fff; padding: 3px; font-size: 9px;', error);
    },
    complete(): void {
      console.log(`%c[${tag}]: Complete`, 'background: #00BCD4; color: #fff; padding: 3px; font-size: 9px;');
    }
  });
}
