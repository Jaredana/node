var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('./verifytoken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

/*
You can add VerifyToken to any method to enable requiring login to access API
*/
const jwt_expire_time = 86400;
router.post('/register', function(req, res, next) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: jwt_expire_time // expires in 10 mins
      });
      res.status(200).send({auth: true, token: token});
    }); 
  });

  //check json token
router.get('/me', function(req, res) {
    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      
      res.status(200).send(user);
    });
  });

router.post('/login', function(req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
      
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: jwt_expire_time // expires in 10 mins
      });
      res.status(200).send({token: token, user_id: user.name});
    });
  });

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });

  
  module.exports = router;