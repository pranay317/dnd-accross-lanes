import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LaneCard } from '../../services/swim-lane.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  form: FormGroup;

  @Input() card: LaneCard;
  @Input() isEdit: LaneCard;

  @Output() addFormSubmit: EventEmitter<LaneCard> = new EventEmitter<LaneCard>();
  @Output() editFormSubmit: EventEmitter<LaneCard> = new EventEmitter<LaneCard>();
  @Output() toggleFormView: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      name: '',
      display: ['', Validators.required],
      description: ''
    });
    if (this.card) {
      this.form.patchValue(this.card);
    }
  }

  submit() {
    if (this.isEdit) {
      this.editFormSubmit.emit(this.form.value);
    } else {
      this.addFormSubmit.emit(this.form.value);
    }
    this.form.reset();
  }

  toggleAddCard() {
    this.toggleFormView.emit('hide');
  }

}
