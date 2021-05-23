import {BehaviorSubject, Subscription} from 'rxjs';
import {generateRandom} from '../operators/util';

/**
 * A BevaviorSubject is instantiated with an initial value.
 * So every subscriber receives this initial value as soon as the subscription takes place.
 * Unless the subject isn't completed, late subscribers will receive the latest value that is emitted
 * by the BehaviorSubject although the subscription was active only after the latest submission.
 */
export function howtoBehaviorSubject(): Subscription {
  const subject = new BehaviorSubject<number>(0);
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
