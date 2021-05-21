import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {howtoConcatMap} from './operators/concat-map';
import {howtoMergeMap} from './operators/merge-map';
import {howtoExhaustMap} from './operators/exhaust-map';
import {howtoSwitchMap} from './operators/switch-map';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {howtoDebouncetime} from './operators/debounce-time';

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
        map(event => event.target.value)
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
