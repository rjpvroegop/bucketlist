import mongoose from 'mongoose';

let uri = "mongodb://localhost/bucketlist";
let connection = null;

export class BucketlistDatabase {
    connect(){
        if(connection == null){
            mongoose.connect(uri);
        } else {

        }
    }


}

