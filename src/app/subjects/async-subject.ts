import {AsyncSubject, Subscription} from 'rxjs';
import {generateRandom} from '../operators/util';

/**
 * An AsyncSubject is a subject that always delivers the lates value.
 * So it doesn't matter when a subscription takes place. Every subscriber will receive the latest submission,
 * that means the last submission before completion.
 */
export function howtoAsyncSubject(): Subscription {
  const subject = new AsyncSubject<number>();
  const values$ = subject.asObservable();

  const subscription: any = values$.subscribe(val => console.log('early sub', val));

  subject.next(generateRandom());
  subject.next(generateRandom());
  subject.next(generateRandom());
  subject.complete(); // must complete in order to emit the latest value

  setTimeout(() => {
    values$.subscribe(val => console.log('late sub', val));
    subject.next(99);
  }, 3000);

  return subscription;
}
