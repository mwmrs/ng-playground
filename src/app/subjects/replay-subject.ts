import {ReplaySubject, Subscription} from 'rxjs';
import {generateRandom} from '../operators/util';

/**
 * An AsyncSubject is a subject that always delivers the lates value.
 * So it doesn't matter when a subscription takes place. Every subscriber will receive the latest submission,
 * that means the last submission before completion.
 */
export function howtoReplaySubject(): Subscription {
  const subject = new ReplaySubject<number>();
  const values$ = subject.asObservable();

  const subscription: any = values$.subscribe(val => console.log('early sub', val));

  subject.next(generateRandom());
  subject.next(generateRandom());
  subject.next(generateRandom());
  // subject.complete(); // if active, late subscribers won't receive anything

  setTimeout(() => {
    values$.subscribe(val => console.log('late sub', val));
    subject.next(99);
  }, 3000);

  return subscription;
}
