import {ItemResource} from "../bucketlist-item/resource/item-resource";
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import livereload from 'connect-livereload';

export class Server {
    constructor() {
        this.init();
        this.start();
    }

    init(){
        this.router = express.Router();
        this.app = express();

        this.configureRouterMiddleware();
        this.configureApp();
        this.generateResources();
    }

    configureApp(){
        this.app.use(livereload()); // reloads the page on file changes
        this.app.use(morgan('dev')); // log requests to the console

        // configure body parser
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use('/api', this.router);
    }

    configureRouterMiddleware() {
        // middleware to use for all requests
        // this.router.use(function (req, res, next) {
        //     console.log(req.body);
        //     next();
        // });
    }

    generateResources(){
        new ItemResource(this.router);
    }

    start(){
        const port = process.env.PORT || 8080; // set our port

        this.app.listen(port);
        console.log('Magic happens on port ' + port);
    }
}