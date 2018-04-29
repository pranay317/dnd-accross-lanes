import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwimLaneService, Lane, LaneCard } from '../../services/swim-lane.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DraggableDto } from '../card/card.component';
import { SortEvent } from '../../directives/sortable.directive';

@Component({
  selector: 'app-swim-lane',
  templateUrl: './swim-lane.component.html',
  styleUrls: ['./swim-lane.component.scss']
})
export class SwimLaneComponent implements OnInit {
  @Input() lane: Lane;
  @Output() reloadLanes: EventEmitter<Lane[]> = new EventEmitter<Lane[]>();

  // form: FormGroup;

  isAddingCard = false;

  constructor(
    private swimLaneService: SwimLaneService,
    // private _fb: FormBuilder
  ) { }

  ngOnInit() {
    // this.form = this._fb.group({
    //   display: ['', Validators.required],
    //   description: ''
    // });
  }

  toggleAddCard(val?) {
    this.isAddingCard = val ? !val : !this.isAddingCard;
  }

  addCard(laneCard: LaneCard) {
    this.swimLaneService.addCard(this.lane.name, laneCard).subscribe(cards => {
      this.lane.cards = cards;
      this.toggleAddCard();
      // this.form.reset();
    });
  }

  swapItems(data: DraggableDto) {
    this.swimLaneService.swapCard(data.card, data.fromLane, this.lane.name).subscribe(lanes => {
      this.reloadLanes.emit(lanes);
    });
  }

  removeCard(data: DraggableDto) {
    this.swimLaneService.deleteCard(data.card, data.fromLane).subscribe(cards => {
      this.lane.cards = cards;
    });
  }

  sort(event: SortEvent) {
    const card = this.lane.cards[event.currentIndex];
    this.swimLaneService.swapCard(card, this.lane.name, this.lane.name, event.newIndex).subscribe(lanes => {
      this.reloadLanes.emit(lanes);
    });
  }

}
