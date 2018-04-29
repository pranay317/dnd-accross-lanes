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
    // debugger;
    event.dataTransfer.setData('text/plain', JSON.stringify(this.dto));
    console.log('drag started....');
    this.dragStart.emit(event);
  }

  @HostListener('drag', ['$event']) onDrag(event: DragEvent) {
    // debugger;
    // event.dataTransfer.setData('text/plain', JSON.stringify(this.dto));
    console.log('dragging....');
    this.dragMove.emit(event);
  }

  // @HostListener('pointerdown', ['$event'])
  // onPointerDown(event: DragEvent): void {
  //   // added after YouTube video: ignore right-click
  //   if (event.button !== 0) {
  //     return;
  //   }

  //   this.dragging = true;
  //   this.dragStart.emit(event);
  // }

  // @HostListener('pointermove', ['$event'])
  // onPointerMove(event: DragEvent): void {
  //   console.log('pointer moving...');
  //   if (!this.dragging) {
  //     return;
  //   }

  //   this.dragMove.emit(event);
  // }

  // @HostListener('document:pointercancel', ['$event'])
  // @HostListener('document:pointerup', ['$event'])
  // onPointerUp(event: DragEvent): void {
  //   if (!this.dragging) {
  //     return;
  //   }

  //   this.dragging = false;
  //   this.dragEnd.emit(event);
  // }
}
