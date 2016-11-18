import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class upload {

  data = {
    id: '',
    title: '',
    description: '',
    checked: false,
    image: '',
    info: ''
  };

  constructor(http) {
    this.http = http;
  }

  activate(params) {
    this.data.id = params.id;
    return this.http.fetch('/bucketlist/api/api.php/' + params.id, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => this.data = data);
  }

  postData() {
    if (this.data.title && this.data.description && this.data.image) {
      this.http.fetch('/bucketlist/api/api.php', {
        method: "PUT",
        body: JSON.stringify(this.data)
      })
        .then(()=>window.location.replace('/bucketlist'));
      // console.log(this.data);
    } else {
      alert("The tile, description and image are required");
    }
  }
}
