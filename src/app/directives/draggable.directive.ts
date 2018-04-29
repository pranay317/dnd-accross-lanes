import { Directive, HostListener, HostBinding, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DraggableDto } from '../components/card/card.component';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @HostBinding('draggable') draggable = true;
  @Input() dto: DraggableDto;

  constructor(public element: ElementRef) { }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    // debugger;
    event.dataTransfer.setData('text/plain', JSON.stringify(this.dto));
    console.log(event.clientX, event.clientY);
  }

}
