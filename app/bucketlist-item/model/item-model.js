const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BucketlistItemSchema = new Schema({
    title: String,
    description: String,
    completed: {
        date: Date,
        done: Boolean,
        activities: [
            {
                title: String,
                description: String,
                image:String,
                date: Date
            }
        ]
    },
    image: String,
});

export const BucketlistItem = mongoose.model('BucketlistItem', BucketlistItemSchema);