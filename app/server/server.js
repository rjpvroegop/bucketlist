import {ItemResource} from "../bucketlist-item/resource/item-resource";
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export class Server {
    constructor() {
        this.init();
        this.start();
    }

    init(){
        this.app = express();
        this.router = express.Router();

        this.configureApp();
        this.configureRouterMiddleware();

        this.generateResources();
    }

    configureApp(){
        this.app.use(morgan('dev')); // log requests to the console

        // configure body parser
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use('/api', this.router);
    }

    configureRouterMiddleware() {
        // middleware to use for all requests
        this.router.use(function (req, res, next ) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
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