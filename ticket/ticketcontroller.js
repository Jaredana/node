var Ticket = require('../ticket/ticket');
var config = require('../config');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//logic for grabbing tickets from database with varying filter
router.get('/getticket', function(req, res) {
    Ticket.find({}, function(err, tickets) {
        if (err) return res.status(500).send("There was a problem finding the tickets.");
        res.status(200).send({'tickets': tickets});
    });
});

router.post('/maketicket', function(req, res, next) {
    Ticket.create({
        ID: req.body._id,
        Issue: req.body.Issue,
        Location: req.body.Location,
        Date: req.body.Date,
        User_ID: req.body.User_ID
    },
    function(err, ticket) {
        if(err) return res.status(500).send("We couldnt create the ticket")
        res.status(200).send({ticket: ticket})
    });
});
router.post('/editticket', function(req, res) {
    Ticket.find({}).updateOne({'_id': req.body.ID_to_edit},{'Issue': req.body.Issue, 'Location': req.body.Location, 'Date': req.body.Date, 'User_ID' : req.body.User_ID}, function(err, ticket) {
        if(err) return res.status(500).send('we couldnt find that ticket to edit it');
        res.status(200).send({ticket: 'ticket edited'});
    });
});
router.post('/deleteticket', function(req, res) {
    Ticket.find({}).findOneAndDelete({'_id': req.body.ID_to_delete}, function(err, del) {
        if(err) return res.status(500).send('We couldnt find that ticket to delete it');
        res.status(200).send({del: 'ticket removed'});
    });
});

module.exports = router;