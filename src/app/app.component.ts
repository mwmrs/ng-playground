import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {howtoConcatMap} from './operators/concat-map';
import {howtoMergeMap} from './operators/merge-map';
import {howtoExhaustMap} from './operators/exhaust-map';
import {howtoSwitchMap} from './operators/switch-map';
import {fromEvent, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {howtoDebouncetime} from './operators/debounce-time';
import {howtoDelayWhen} from './operators/delay-when';
import {howtoSubject} from './subjects/subject';
import {howtoBehaviorSubject} from './subjects/behavior-subject';
import {howtoAsyncSubject} from './subjects/async-subject';
import {howtoReplaySubject} from './subjects/replay-subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ng-playground';

  @ViewChild('inputElement') inputText?: ElementRef;

  private subscriptions = new Map<string, Subscription>();

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent<any>(this.inputText?.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith('startWidth on input-keyup') // ermöglicht einen Startwert, solang bis tatsächlich was kommt
      )
      .subscribe(console.log);
  }

  onConcatMap(): void {
    this.manageSubscription(howtoConcatMap);
  }

  onMergeMap(): void {
    this.manageSubscription(howtoMergeMap);
  }

  onExhaustMap(): void {
    this.manageSubscription(howtoExhaustMap);
  }

  onSwitchMap(): void {
    this.manageSubscription(howtoSwitchMap);
  }

  onDebounceTime(): void {
    this.manageSubscription(howtoDebouncetime);
  }

  onDelayWhen(): void {
    this.manageSubscription(howtoDelayWhen);
  }

  onSubject(): void {
    this.manageSubscription(howtoSubject);
  }

  onBehaviorSubject(): void {
    this.manageSubscription(howtoBehaviorSubject);
  }

  onAsyncSubject(): void {
    this.manageSubscription(howtoAsyncSubject);
  }

  onReplaySubject(): void {
    this.manageSubscription(howtoReplaySubject);
  }

  private manageSubscription(fn: () => Subscription): void {
    const sub = this.subscriptions.get(fn.name);
    if (sub) {
      sub.unsubscribe();
      this.subscriptions.delete(fn.name);
    } else {
      console.clear();
      this.subscriptions.set(fn.name, fn());
    }
  }

}
