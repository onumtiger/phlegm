const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemeSchema = new Schema(
  {
    id: { type: Number, required: true},
    box_count: { type: Number, required: false},
    height: { type: Number, required: false},
    width: { type: Number, required: false},
    url: { type: String, required: true},
    name: { type: String, required: false},
    captions: { type: [String], required: true },
    runtime: { type: Number, required: false},
 }); 
//comments, voting, stats tbd


module.exports = mongoose.model('Meme', MemeSchema );
