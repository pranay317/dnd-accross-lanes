import { AfterContentChecked, ContentChildren, Directive, EventEmitter, Output, QueryList, ViewContainerRef } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';

export interface SortEvent {
  currentIndex: number;
  newIndex: number;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return rectB.top - rectA.top;
};

const vCenter = (rect: ClientRect): number => {
  return rect.top + rect.height / 2;
};

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective {
  _sortables: QueryList<DraggableDirective>;

  @ContentChildren(DraggableDirective)
  set sortables(data: QueryList<DraggableDirective>) {
    this._sortables = data;
    this.subscribeToEvents();
  }
  get sortables() {
    return this._sortables;
  }

  @Output() sort = new EventEmitter<SortEvent>();
  private clientRects: ClientRect[];

  dragStartSubscription: any[];
  dragMoveSubscription: any[];

  constructor() { }

  subscribeToEvents() {
    this.dragStartSubscription = this.dragStartSubscription || new Array(this.sortables.length);
    this.dragMoveSubscription = this.dragMoveSubscription || new Array(this.sortables.length);
    this.sortables.forEach((sortable, index) => {
      if (this.dragStartSubscription && this.dragStartSubscription[index]) { this.dragStartSubscription[index].unsubscribe(); }
      if (this.dragMoveSubscription && this.dragMoveSubscription[index]) { this.dragMoveSubscription[index].unsubscribe(); }

      (function(self, sortbl, i) {
        self.dragStartSubscription[i] = sortbl.dragStart.subscribe(() => self.measureClientRects.call(self));
        self.dragMoveSubscription[i] = sortbl.dragMove.subscribe(event => self.detectSorting.call(self, sortbl, event));
      })(this, sortable, index);

    });
  }

  private measureClientRects() {
    this.clientRects = this.sortables.map(sortable => sortable.element.nativeElement.getBoundingClientRect());
  }

  private detectSorting(sortable: DraggableDirective, event: DragEvent) {
    const currentIndex = this.sortables.toArray().indexOf(sortable);
    const currentRect = this.clientRects[currentIndex];

    this.clientRects
      .slice()
      .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
      .filter(rect => rect !== currentRect)
      .some(rect => {
        // const isHorizontal = rect.top === currentRect.top;
        const isBefore = rect.top < currentRect.top;

        const moveBack = isBefore && event.clientY < vCenter(rect);

        const moveForward = !isBefore && event.clientY > vCenter(rect);

        console.log(isBefore, event.clientY, vCenter(rect), moveForward, moveBack);

        if (moveBack || moveForward) {
          // debugger;
          this.sort.emit({
            currentIndex: currentIndex,
            newIndex: this.clientRects.indexOf(rect)
          });

          return true;
        }

        return false;
      });
  }

}
