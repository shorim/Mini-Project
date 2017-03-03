// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Work = new Schema({
    title: String,
    link: String,
    repo: String,
    screenshot: String,
    owner: String //username of the student

});

module.exports = mongoose.model('Work', Work);