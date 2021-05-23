import {Subject, Subscription} from 'rxjs';
import {generateRandom} from '../operators/util';

/**
 * A subject acts as an emitter and subscriber simultaneously.
 */
export function howtoSubject(): Subscription {
  const subject = new Subject<number>();
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
