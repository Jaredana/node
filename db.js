var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://plarpa:dexter48@cluster0-a6se3.mongodb.net/test?retryWrites=true', {useNewUrlParser: true}, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});