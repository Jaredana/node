var Ticket = require('../ticket/ticket');
var config = require('../config');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//logic for grabbing tickets from database with varying filter
router.get('/getticket', function(req, res) {
    Ticket.find({}, function (err, tickets) {
        if (err) return res.status(500).send("There was a problem finding the tickets.");
        res.status(200).send({'tickets': tickets});
    });
});
router.get('/findlargestID', function(req, res) {
    Ticket.find().sort({ID: -1}).limit(1), function(err, ID) {
        if(err) return res.status(500).send(1);
        res.status(200).send({'ID': ID})
    };
})
router.post('/maketicket', function(req, res, next) {
    Ticket.create({
        ID: req.body.ID,
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
module.exports = router;