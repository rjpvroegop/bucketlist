import {BucketlistItem} from '../model/item-model';
import {BucketlistDatabase} from "../../database/bucketlist-database";

export class ItemRepository extends BucketlistDatabase {
    constructor() {
        super();
        this.connect();
    }

    find(offset, amount) {
        return BucketlistItem.find().skip(offset).limit(amount);
    }

    findById(bucketlistItemId) {
        return BucketlistItem.findById(bucketlistItemId);
    }

    create(bucketlistItem) {
        return BucketlistItem.create(bucketlistItem);
    }

    findByIdAndUpdate(id, bucketlistItem){
        return BucketlistItem.findByIdAndUpdate(id, { $set: bucketlistItem});
    }

    findByIdAndRemove(id){
        return BucketlistItem.findByIdAndRemove(id);
    }
}