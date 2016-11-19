import {HttpClient} from 'aurelia-fetch-client';
import {inject, Container} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(HttpClient, Container, Router)
export class welcome {
  addItem = true;

  constructor(http, container, router) {
    this.http = http;
    this.container = container;
    this.router = router;

    window.addItem = () => this.addItem = true;
  }

  activate() {
    return this.getData().then(data =>
      this.container.registerInstance("bucketlist", data)
    );
  }

  getData() {
    return new Promise((resolve, reject)=> {
      this.http.fetch('/bucketlist/api/v1/bucketlist.php')
        .then(response => response.json())
        .then(data => {
          resolve(data.length == 0 ? this.uploadItem() : data);
        });
    })
  }

  uploadItem(){
    this.router.navigate("upload");
  }
}
