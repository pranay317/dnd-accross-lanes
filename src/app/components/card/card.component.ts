import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LaneCard, SwimLaneService } from '../../services/swim-lane.service';

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

  isEditView = false;

  @Output() removeCard: EventEmitter<DraggableDto> = new EventEmitter<DraggableDto>();
  // @Output() addCard: EventEmitter<LaneCard> = new EventEmitter<LaneCard>();

  dto: DraggableDto;

  constructor(
    private swimLaneService: SwimLaneService
  ) { }

  ngOnInit() {
    this.dto = {
      fromLane: this.lane,
      card: this.card
    };
  }

  deleteCard() {
    this.removeCard.emit(this.dto);
  }

  toggleEditView(val?) {
    this.isEditView = val ? !val : !this.isEditView;
  }

  addCardListener(card: LaneCard) {
    this.swimLaneService.editCard(card, this.lane).subscribe(newCard => {
      this.card = newCard;
      this.toggleEditView();
    });
  }

}
