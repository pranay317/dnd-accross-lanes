import { Directive, EventEmitter, Input, HostListener, HostBinding, Output } from '@angular/core';
import { DraggableDto } from '../components/card/card.component';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  @Input() type = 'lane';
  @Input() curLaneName: string;
  @HostBinding('class.current-droppable') isCurrentDroppable = false;

  counter = 0;

  @Output() dropped: EventEmitter<DraggableDto> = new EventEmitter<DraggableDto>();
  @Output() dragMove = new EventEmitter<PointerEvent>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(event: PointerEvent) {
    event.preventDefault();
    this.dragMove.emit(event);
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event: DragEvent) {
    event.preventDefault();
    // event.stopPropagation();
    this.isCurrentDroppable = true;
    this.counter++;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    // event.stopPropagation();
    this.counter--;
    if (this.counter === 0) {
      this.isCurrentDroppable = false;
    }
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    this.counter = 0;
    const data: DraggableDto = JSON.parse(event.dataTransfer.getData('text'));
    this.isCurrentDroppable = false;
    if (data.fromLane === this.curLaneName) { return; }
    this.dropped.emit(data);
  }

}
