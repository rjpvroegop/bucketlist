const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const ActivitySchema = new Schema({
    title: String,
    description: String,
    image:String,
    date: Date
});