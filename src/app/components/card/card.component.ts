import { Component, OnInit, Input } from '@angular/core';
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

  dto: DraggableDto;

  constructor() { }

  ngOnInit() {
    this.dto = {
      fromLane: this.lane,
      card: this.card
    };
  }

}
