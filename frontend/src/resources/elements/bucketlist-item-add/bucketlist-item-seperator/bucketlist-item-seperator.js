import {bindable} from 'aurelia-framework';

export class bucketlistItemSeperator {
  @bindable completed;
  @bindable info;

  selectCompleted(){
    this.completed = !this.completed;
  }
}
