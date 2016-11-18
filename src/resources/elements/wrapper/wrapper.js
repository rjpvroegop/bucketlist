import {inject} from 'aurelia-framework';

@inject("bucketlist")
export class wrapper {
  constructor(data){
    this.bucketlist = data;
  }
}
