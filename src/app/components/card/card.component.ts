import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LaneCard } from '../../services/swim-lane.service';

export interface DraggableDto {
  fromLane: string;
  card: LaneCard;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: LaneCard;
  @Input() lane: string;

  @Output() removeCard: EventEmitter<DraggableDto> = new EventEmitter<DraggableDto>();

  dto: DraggableDto;

  constructor() { }

  ngOnInit() {
    this.dto = {
      fromLane: this.lane,
      card: this.card
    };
  }

  deleteCard() {
    this.removeCard.emit(this.dto);
  }

}
