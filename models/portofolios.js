// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Work =require('./works');



// create a schema
var Portofolio = new Schema({
    firstName: String,
    lastName: String,
    profilePic: String,
    description: String,
    work: Array,
    owner: String //username of the student
});

Portofolio.methods.getName = function() {
    return (this.firstName + ' ' + this.lastName);
};

// the schema is useless so far
module.exports = mongoose.model('Portofolio', Portofolio);