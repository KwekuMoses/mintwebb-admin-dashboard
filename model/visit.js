var mongoose = require('mongoose')
var Schema = mongoose.Schema
  ; (visitSchema = new Schema({
    catalog: String,
    product: String,
    date: Number,
    year: Number,
    month: Number,
    day: Number,
    hour: Number,
    minute: Number,
    second: Number,
    readDate: String,
    country: String,
    city: String,
    userData: Object
  })),
    (visit = mongoose.model('visit', visitSchema))

module.exports = visit
