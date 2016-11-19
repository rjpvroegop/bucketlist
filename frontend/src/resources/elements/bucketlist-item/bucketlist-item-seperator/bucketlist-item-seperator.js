import {inject, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class bucketlistItemSeperator {
  @bindable item;
  deleting = true;
  editing = true;

  constructor(http, router) {
    this.http = http;
    this.router = router;
    window.removeItem = ()=>this.deleting = true;
    window.editItem = ()=>this.editing = true;
  }

  removeItem(id) {
    this.http.fetch('/bucketlist/api/v1/bucketlist.php?id=' + this.item.id, {
      method: "DELETE"
    });
    location.reload();
  }

  editItem(id) {
    this.router.navigate("/edit/" + id);
  }
}
