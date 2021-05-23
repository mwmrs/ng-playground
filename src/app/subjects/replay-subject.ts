import {ReplaySubject, Subscription} from 'rxjs';
import {generateRandom} from '../operators/util';

/**
 * A ReplaySubject is a subject that always delivers all values emitted even to a late subscriber.
 * So it doesn't matter when a subscription takes place. Every subscriber will receive the all submissions
 * until the subject is completed.
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
