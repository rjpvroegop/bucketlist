import mongoose from 'mongoose';
import {BucketlistItem} from '../model/item-model';

export class ItemRepository {
    constructor() {
        mongoose.connect('mongodb://localhost/bucketlist'); // connect to our database
    }

    getItems() {
        return new Promise((resolve, reject) => {
            BucketlistItem.find((err, items) => {
                if (err) {
                    reject(this.databaseError(err));
                } else {
                    resolve(items)
                }
            });
        });
    }

    getItem(id) {
        return new Promise((resolve, reject) => {
            BucketlistItem.findById(id, (err, item) => {
                if (err) {
                    reject(this.databaseError(err));
                } else {
                    resolve(item)
                }
            });
        });
    }

    insertItem(model) {
        return new Promise((resolve, reject) => {
            let bucketlistItem = this.applyModelToDbo(model, new BucketlistItem());

            bucketlistItem.save((err) => {
                if (err) {
                    reject(this.databaseError(err));
                } else {
                    resolve({
                        message: 'BucketlistItem created!'
                    });
                }
            });
        });
    }

    updateItem(id, model) {
        return new Promise((resolve, reject) => {
            BucketlistItem.findById(id, (err, item) => {
                if (err) {
                    reject(this.databaseError(err));
                } else if (!item) {
                    reject({
                        error: true,
                        message: "Item not found."
                    });
                } else {
                    item = this.applyModelToDbo(model, item);

                    item.save((err) => {
                        if (err) {
                            reject(this.databaseError(err));
                        } else {
                            resolve({
                                message: 'BucketlistItem updated!'
                            });
                        }
                    });
                }
            });
        });
    }

    deleteItem(id) {
        return new Promise((resolve, reject) => {
            BucketlistItem.remove({_id: id}, (err) => {
                if (err) {
                    reject(this.databaseError(err));
                } else {
                    resolve({
                        message: 'Successfully deleted'
                    });
                }
            });
        });
    }

    databaseError(err){
        return {
            error: true,
            message: "A database error occured",
            server: true,
            messages: err
        }
    }

    applyModelToDbo(model, dbo) {
        Object.keys(model)
            .forEach(
                key => dbo[key] = model[key]
            );
        return dbo;
    }
}