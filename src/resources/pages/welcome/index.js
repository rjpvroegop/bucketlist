import {HttpClient} from 'aurelia-fetch-client';
import {inject, Container} from 'aurelia-framework';

@inject(HttpClient, Container)
export class welcome {
  addItem = false;

  constructor(http, container) {
    this.http = http;
    this.container = container;

    window.addItem = () => this.addItem = true;
  }

  activate() {
    return this.getData().then(data =>
      this.container.registerInstance("bucketlist", data)
    );
  }

  getData() {
    return new Promise((resolve, reject)=> {
      this.http.fetch('/bucketlist/api/api.php')
        .then(response => response.json())
        .then(data => {
          resolve(data.error ? window.location.replace('/bucketlist/#/upload') : data);
        });
    })
  }

}
