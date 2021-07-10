import { Component, HostListener, VERSION } from '@angular/core';
import { KeyboardEventExt } from './keyboard-event-ext';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  math = Math;

  name = 'Keyboard';
  events: KeyboardEventExt[];
  timeStamp: number;

  count: number;
  average: number;
  standardDeviation: number;

  constructor() {
    this.events = new Array(0);
    this.timeStamp = 0;
  }

  @HostListener('document:keypress', ['$event'])
  onKeyPress(keyboardEvent: KeyboardEvent) {
    const delay =
      this.timeStamp == 0 ? 0 : keyboardEvent.timeStamp - this.timeStamp;
    this.timeStamp = keyboardEvent.timeStamp;

    const ext = new KeyboardEventExt();
    ext.delay = delay;
    ext.event = keyboardEvent;

    this.events.push(ext);

    this.events = this.events.sort((a, b) => {
      if (a.event.timeStamp < b.event.timeStamp) {
        return 1;
      }

      if (a.event.timeStamp == b.event.timeStamp) {
        return 0;
      }

      if (a.event.timeStamp > b.event.timeStamp) {
        return -1;
      }
    });

    this.count = this.events.filter(e => e.delay !== 0).length;
    const sum = this.events
      .filter(e => e.delay !== 0)
      .reduce((s, e) => s + e.delay, 0);
    this.average = this.count > 0 ? sum / this.count : 0;

    this.events
      .filter(e => e.delay !== 0)
      .forEach(
        e => (e.standardDeviation = Math.pow(e.delay - this.average, 2))
      );

    const sumsd = this.events
      .filter(e => e.delay !== 0)
      .reduce((s, e) => s + e.standardDeviation, 0);

    this.standardDeviation = Math.sqrt(sumsd / this.count);

    console.log(`average ${this.average}`);
    console.log(`sd ${this.standardDeviation}`);
  }
}
