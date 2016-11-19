import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class upload {

    data = {
        id: '',
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

    activate(params) {
        this.data.id = params.id;
        return this.http.fetch('/bucketlist/api/v1/bucketlist.php?id=' + params.id, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => this.data = data);
    }

    postData() {
        if (this.data.title && this.data.description && this.data.image) {
            let self = this;
            this.http.fetch('/bucketlist/api/v1/bucketlist.php', {
                method: "PUT",
                body: JSON.stringify(this.data)
            })
                .then(self.redirectHome.bind(self));
        } else {
            alert("The tile, description and image are required");
        }
    }

    redirectHome() {
        this.router.navigate("/");
    }
}
