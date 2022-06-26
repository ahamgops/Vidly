const winston= require('winston');
const mongoose = require('mongoose');

module.exports= function(){
    mongoose.connect('mongodb://localhost:27017/vidly')
.then(()=> winston.info('connected to MongoDB...'))
.catch(err => winston.info('Couldn\'t connect to MongoDB database...', err));
}


