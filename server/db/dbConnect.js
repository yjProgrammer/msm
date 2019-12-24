module.exports = function (dbName) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/' + dbName, { useNewUrlParser: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('open');
    });
    return mongoose;
}