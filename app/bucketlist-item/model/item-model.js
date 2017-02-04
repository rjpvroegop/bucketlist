import {ActivitySchema} from "./activity-model";
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BucketlistItemSchema = new Schema({
    title: String,
    description: String,
    completed: {
        date: Date,
        done: Boolean,
        activities: [ActivitySchema]
    },
    image: String,
});

export const BucketlistItem = mongoose.model('BucketlistItem', BucketlistItemSchema);