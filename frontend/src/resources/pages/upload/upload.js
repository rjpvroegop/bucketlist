import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class upload {

  data = {
    title: '',
    description: '',
    completed: false,
    image: '',
    info: ''
  };

  constructor(http, router) {
    this.http = http;
    this.router = router;
  }

  postData() {
    if (this.data.title && this.data.description && this.data.image) {
      let self = this;
      this.http.fetch('/bucketlist/api/v1/bucketlist.php', {
        method: "POST",
        body: JSON.stringify(this.data)
      })
        .then(self.redirectHome.bind(self));
    } else {
      alert("The tile, description and image are required");
    }
  }

  redirectHome(){
    this.router.navigate("/");
  }
}
