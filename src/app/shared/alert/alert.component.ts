import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message: string = 'An unknown error has occured';
  @Output('close') close: EventEmitter<void> = new EventEmitter();
  constructor() {}
  onClose() {
    this.close.emit();
  }
}
