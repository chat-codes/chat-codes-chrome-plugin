import {Component,Injectable,EventEmitter,Output} from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'name-channel-entry',
  templateUrl: './name-channel-entry.component.html',
  styleUrls: [],
})

export class NameChannelEntry {
  private channelValueChange(name:string) {
    const value = name.trim();

    if(value.length === 0) {
      this.feedback = 'Must be more than 0 characters';
      this.feedbackClass = 'error';
    } else if(value.length > this.MAX_LENGTH) {
      this.feedback = 'Must be ' + this.MAX_LENGTH + ' characters or fewer';
      this.feedbackClass = 'error';
    } else {
      this.feedback = '';
      this.feedbackClass = '';
    }
  }

  private userValueChange(name:string) {
    const value = name.trim();

    if(value.length === 0) {
      this.feedback = 'Must be more than 0 characters';
      this.feedbackClass = 'error';
    } else if(value.length > this.MAX_LENGTH) {
      this.feedback = 'Must be ' + this.MAX_LENGTH + ' characters or fewer';
      this.feedbackClass = 'error';
    } else {
      this.feedback = '';
      this.feedbackClass = '';
    }
  }



  private onKeydown(event) {
    if(event.keyCode === 13) {
      const userValue = this.userValue.trim();
      const channelValue = this.channelValue.trim();
      if(userValue.length > 0 && userValue.length < this.MAX_LENGTH
        && channelValue.length > 0 && channelValue.length < this.MAX_LENGTH) {
        this.channelOnEnter.emit({userValue:userValue, channelValue:channelValue});
      }
    }
  }

  @Output() channelOnEnter:EventEmitter<any> = new EventEmitter();
  private channelValue:string;
  private userValue: string;
  private feedback:string='';
  private feedbackClass:string='';
  private MAX_LENGTH = 20;
}