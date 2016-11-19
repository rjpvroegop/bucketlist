import {bindable} from 'aurelia-framework';

export class bucketlistItem {
  @bindable title;
  @bindable image;
  @bindable description;
  @bindable completed;
  @bindable info;
}
