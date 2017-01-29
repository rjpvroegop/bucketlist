import mongoose from 'mongoose';

export class Database {
    constructor(dbo){
        this.dbo = dbo;
    }

    getAll() {
        this._connect();
        let response = new Promise((resolve, reject) => {
            this.dbo.find((err, items) => {
                if (err) {
                    this._disconnect();
                    reject(this._databaseError(err));
                } else {
                    this._disconnect();
                    resolve(items)
                }
            });
        });
        return response;
    }

    getOne(id) {
        this._connect();
        let response = new Promise((resolve, reject) => {
            this.dbo.findById(id, (err, item) => {
                if (err) {
                    this._disconnect();
                    reject(this._databaseError(err));
                } else {
                    this._disconnect();
                    resolve(item)
                }
            });
        });
        return response;
    }

    insertOne(model) {
        this._connect();
        let response = new Promise((resolve, reject) => {
            let dbo = this._applyModelToDbo(model, new this.dbo());

            dbo.save((err, item) => {
                if (err) {
                    this._disconnect();
                    reject(this._databaseError(err));
                } else {
                    this._disconnect();
                    resolve(item);
                }
            });
        });
        return response;
    }

    updateOne(model, id) {
        this._connect();
        let response = new Promise((resolve, reject) => {
            this.dbo.findById(id, (err, item) => {
                if (err) {
                    this._disconnect();
                    reject(this._databaseError(err));
                } else {
                    try {
                        item = this._applyModelToDbo(model, item);

                        item.save((err) => {
                            if (err) {
                                this._disconnect();
                                reject(this._databaseError(err, item));
                            } else {
                                this._disconnect();
                                resolve(item);
                            }
                        });
                    } catch (err) {
                        this._disconnect();
                        reject(err);
                    }
                }
            });
        });
        return response;
    }

    deleteOne(id) {
        this._connect();
        let response = new Promise((resolve, reject) => {
            this.dbo.remove({_id: id}, (err) => {
                if (err) {
                    this._disconnect();
                    reject(this._databaseError(err));
                } else {
                    this._disconnect();
                    resolve({
                        message: 'Successfully deleted'
                    });
                }
            });
        });
        return response;
    }

    _connect() {
        try {
            mongoose.connect('mongodb://localhost/bucketlist'); // _connect to our database
        } catch (err) {
            console.log(err);
        }

    }

    _disconnect() {
        try {
            mongoose.disconnect();
        } catch (err) {
            console.log(err);
        }
    }

    _databaseError(err) {
        return {
            error: true,
            message: "A database error occured",
            server: true,
            messages: err
        }
    }

    _applyModelToDbo(model, dbo) {
        Object.keys(model)
            .forEach(
                key => dbo[key] = model[key]
            );
        return dbo;
    }
}