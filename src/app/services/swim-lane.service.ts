import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let globalCount = 1;

export interface Lane {
  name: string;
  display: string;
  cards?: LaneCard[];
}

export interface LaneCard {
  name: string;
  display: string;
  description: string;
}

@Injectable()
export class SwimLaneService {
  lanes: Lane[] = [{
    name: 'to-do',
    display: 'TO-DO',
    cards: []
  }, {
    name: 'in-progress',
    display: 'In Progress',
    cards: []
  }, {
    name: 'done',
    display: 'Done',
    cards: []
  }];

  constructor() { }

  getLanesMaster(): Observable<Lane[]> {
    return Observable.of(this.lanes);
  }

  addCard(onLane: string, card: LaneCard): Observable<LaneCard[]> {
    const laneIndex = this.lanes.findIndex(item => item.name === onLane);
    card.name = `${card.display.split(' ').join('_')}_${globalCount++}`;
    this.lanes[laneIndex].cards.push(card);
    return Observable.of(this.lanes[laneIndex].cards);
  }

  swapCard(card: LaneCard, fromLane: string, toLane: string, onIndex?: number): Observable<Lane[]> {
    const fLaneIndex = this.lanes.findIndex(item => item.name === fromLane);
    const tLaneIndex = this.lanes.findIndex(item => item.name === toLane);
    const cardCurIndex = this.lanes[fLaneIndex].cards.findIndex(item => item.name === card.name);
    this.lanes[fLaneIndex].cards.splice(cardCurIndex, 1);
    // debugger;
    if (onIndex >= 0) {
      this.lanes[tLaneIndex].cards.splice(onIndex, 0, card);
    } else {
      this.lanes[tLaneIndex].cards.push(card);
    }
    return Observable.of(this.lanes);
  }

  deleteCard(card: LaneCard, onLane: string): Observable<LaneCard[]> {
    const laneIndex = this.lanes.findIndex(item => item.name === onLane);
    const cardCurIndex = this.lanes[laneIndex].cards.findIndex(item => item.name === card.name);
    this.lanes[laneIndex].cards.splice(cardCurIndex, 1);
    return Observable.of(this.lanes[laneIndex].cards);
  }

  editCard(card: LaneCard, onLane: string): Observable<LaneCard> {
    const laneIndex = this.lanes.findIndex(item => item.name === onLane);
    const cardCurIndex = this.lanes[laneIndex].cards.findIndex(item => item.name === card.name);
    this.lanes[laneIndex].cards.splice(cardCurIndex, 1, card);
    return Observable.of(card);
  }

}
