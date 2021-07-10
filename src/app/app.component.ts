import { Component, HostListener, VERSION } from '@angular/core';
import { KeyboardEventExt } from './keyboard-event-ext';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Keyboard';
  events: KeyboardEventExt[];
  timeStamp: number;

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
  }
}
