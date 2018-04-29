import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SwimLaneComponent } from './components/swim-lane/swim-lane.component';
import { SwimLaneService } from './services/swim-lane.service';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routes';
import { CardComponent } from './components/card/card.component';
import { DraggableDirective } from './directives/draggable.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { SortableDirective } from './directives/sortable.directive';
import { EditTaskComponent } from './components/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    SwimLaneComponent,
    HomeComponent,
    CardComponent,
    DraggableDirective,
    DroppableDirective,
    SortableDirective,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SwimLaneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
