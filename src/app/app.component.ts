import { Component, HostListener, VERSION } from '@angular/core';
import { KeyboardEventExt } from '../models/keyboard-event-ext';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  events: KeyboardEventExt[];
  timeStamp: number;

  constructor() {
    this.events = new Array(0);
    this.timeStamp = Date.now();
  }

  @HostListener('document:keypress', ['$event'])
  onKeyPress(keyboardEvent: KeyboardEvent) {
    console.log(keyboardEvent);

    const ext = new KeyboardEventExt();
    ext.delay = 1;
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
  }
}
