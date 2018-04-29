import { Component, OnInit } from '@angular/core';
import { SwimLaneService, Lane } from '../../services/swim-lane.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lanes: Lane[];
  constructor(private swimLaneService: SwimLaneService) { }

  ngOnInit() {
    this.swimLaneService.getLanesMaster().subscribe(res => {
      this.lanes = res;
    });
  }

  reloadLanes(lanes: Lane[]) {
    this.lanes = lanes;
  }

}
