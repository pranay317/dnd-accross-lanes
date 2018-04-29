import { Directive, HostListener, HostBinding, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DraggableDto } from '../components/card/card.component';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @HostBinding('draggable') draggable = true;
  @Input() dto: DraggableDto;

  @Output() dragStart = new EventEmitter<DragEvent>();
  @Output() dragMove = new EventEmitter<DragEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();

  constructor(public element: ElementRef) { }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    event.dataTransfer.setData('text/plain', JSON.stringify(this.dto));
    this.dragStart.emit(event);
  }

  @HostListener('drag', ['$event']) onDrag(event: DragEvent) {
    this.dragMove.emit(event);
  }
}
