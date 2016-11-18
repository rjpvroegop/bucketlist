import {inject, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)

export class bucketlistItemSeperator {
  @bindable item;
  deleting = false;
  editing = false;

  constructor(http) {
    this.http = http;
    window.removeItem = ()=>this.deleting = true;
    window.editItem = ()=>this.editing = true;
  }

  removeItem(id) {
    this.http.fetch('/bucketlist/api/api.php', {
      method: "DELETE",
      body: JSON.stringify({id})
    })
      .then(()=>window.location.replace('/bucketlist'));
  }

  editItem(id) {
    window.location.replace('/bucketlist/#/edit/' + id);
  }
}
