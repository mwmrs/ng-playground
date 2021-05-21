import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {howtoConcatMap} from './operators/concat-map';
import {howtoMergeMap} from './operators/merge-map';
import {howtoExhaustMap} from './operators/exhaust-map';
import {howtoSwitchMap} from './operators/switch-map';
import {fromEvent} from 'rxjs';
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
    howtoConcatMap();
  }

  onMergeMap(): void {
    howtoMergeMap();
  }

  onExhaustMap(): void {
    howtoExhaustMap();
  }

  onSwitchMap(): void {
    howtoSwitchMap();
  }

  onDebounceTime(): void {
    howtoDebouncetime();
  }
}
