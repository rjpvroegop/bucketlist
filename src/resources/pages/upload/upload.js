import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class upload {

  data = {
    title: '',
    description: '',
    checked: false,
    image: '',
    info: ''
  };

  constructor(http) {
    this.http = http;
  }

  postData() {
    if (this.data.title && this.data.description && this.data.image) {
      this.http.fetch('/bucketlist/api/api.php', {
        method: "POST",
        body: JSON.stringify(this.data)
      })
        .then(()=>window.location.replace('/bucketlist'));
      // console.log(this.data);
    } else {
      alert("The tile, description and image are required");
    }
  }
}
