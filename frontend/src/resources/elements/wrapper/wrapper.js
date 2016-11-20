import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject("bucketlist", HttpClient)
export class wrapper {
  constructor(data, http){
    this.bucketlist_ids = data;
    this.bucketlist = [];
    this.http = http;
  }

  attached(){
    this.bucketlist_ids.forEach(id => {
      this.http.fetch('/bucketlist/api/v1/bucketlist.php?id=' + id, {
        method: "GET"
      })
          .then(response => response.json())
          .then(data => this.bucketlist.push(data));
    })
  }
}
