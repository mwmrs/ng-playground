import {Component, OnInit} from '@angular/core';
import {howtoConcatMap} from './operators/concat-map';
import {howtoMergeMap} from './operators/merge-map';
import {howtoExhaustMap} from './operators/exhaust-map';
import {howtoSwitchMap} from './operators/switch-map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-playground';

  ngOnInit(): void {
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
}
