import {bindable} from 'aurelia-framework';

export class bucketlistItemText {
  @bindable title;
  @bindable description;

  auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight + 10)+"px";
  }
}
